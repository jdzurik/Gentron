"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ta_json_1 = require("ta-json");
const tsxml_1 = require("tsxml");
const xml2js_1 = require("xml2js");
const X2JS = require("x2js");
class Utilities {
    constructor() { }
    static equal(a, b) {
        if (a === b) {
            return true;
        }
        if (a && b && typeof a == 'object' && typeof b == 'object') {
            const arrA = this.isArray(a);
            const arrB = this.isArray(b);
            let i;
            let length;
            let key;
            if (arrA && arrB) {
                length = a.length;
                if (length != b.length) {
                    return false;
                }
                for (i = length; i-- !== 0;) {
                    if (!this.equal(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            if (arrA != arrB) {
                return false;
            }
            const dateA = a instanceof Date;
            const dateB = b instanceof Date;
            if (dateA != dateB) {
                return false;
            }
            if (dateA && dateB) {
                return a.getTime() == b.getTime();
            }
            const regexpA = a instanceof RegExp;
            const regexpB = b instanceof RegExp;
            if (regexpA != regexpB) {
                return false;
            }
            if (regexpA && regexpB) {
                return a.toString() == b.toString();
            }
            const keys = Object.keys(a);
            length = keys.length;
            if (length !== Object.keys(b).length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                    return false;
                }
            }
            for (i = length; i-- !== 0;) {
                key = keys[i];
                if (!this.equal(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        return a !== a && b !== b;
    }
    ;
    static hasValue(obj) {
        return typeof (obj) !== typeof (undefined) && obj !== null;
    }
    static hasStringValue(obj) {
        return this.hasValue(obj) && obj.toString().length > 0;
    }
    static hasObjectValue(obj) {
        if (!this.isObject) {
            return false;
        }
        let i = 0;
        for (let key in obj) {
            i += 1;
        }
        return i > 0;
    }
    static isArray(obj) {
        return Array.isArray(obj) || obj instanceof Array;
    }
    static isBoolean(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof (true);
    }
    static isFunction(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ((() => { }));
    }
    static isObject(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ({});
    }
    static isNumber(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof (0);
    }
    static isPrimitive(obj) {
        return this.hasValue(obj)
            && (typeof (obj) === typeof (true)
                || typeof (obj) === typeof (0)
                || typeof (obj) === typeof (""));
    }
    static isString(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ("");
    }
    static getErrorMessage(thrownError) {
        try {
            return thrownError.message;
        }
        catch (e) {
            return thrownError.toString() || this.getErrorMessage(e);
        }
    }
    static mkDirByPathSync(targetDir, args = {}) {
        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir)
            ? sep
            : '';
        const baseDir = args.isRelativeToScript
            ? __dirname
            : '.';
        return targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
            try {
                fs.mkdirSync(curDir);
            }
            catch (err) {
                if (err.code === "EEXIST") {
                    return curDir;
                }
                if (err.code === 'ENOENT') {
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }
                const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                    throw err;
                }
            }
            return curDir;
        }, initDir);
    }
    static newGuid() {
        return this._guidPlaceholder.replace(/[xy]/g, function (substring) {
            const rand = Math.random() * 16 | 0;
            const ret = (substring === "x")
                ? rand
                : (rand & 0x3 | 0x8);
            return ret.toString(16);
        });
    }
    static newCryptoGuid() {
        const hex = [];
        for (let i = 0; i < 256; i++) {
            hex[i] = (i < 16 ? "0" : "") + (i).toString(16);
        }
        const rand = new Uint8Array(16);
        crypto.randomFillSync(rand);
        rand[6] = rand[6] & 0x0f | 0x40;
        rand[8] = rand[8] & 0x3f | 0x80;
        return (hex[rand[0]] +
            hex[rand[1]] +
            hex[rand[2]] +
            hex[rand[3]] +
            "-" +
            hex[rand[4]] +
            hex[rand[5]] +
            "-" +
            hex[rand[6]] +
            hex[rand[7]] +
            "-" +
            hex[rand[8]] +
            hex[rand[9]] +
            "-" +
            hex[rand[10]] +
            hex[rand[11]] +
            hex[rand[12]] +
            hex[rand[13]] +
            hex[rand[14]] +
            hex[rand[15]]);
    }
    static formatXml(unformattedXml) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tsxml_1.Compiler.formatXmlString(unformattedXml);
            }
            catch (e) {
                return yield this.formatXml(`<Error><Message>XML Formatting Failed</Message><Data>${unformattedXml}</Data></Error>`);
            }
        });
    }
    static xmlStrToJsonObj(xml) {
        let ret = null;
        try {
            this.parser.parseString(xml, function (err, jsonResultObj) {
                if (err) {
                    throw err;
                }
                else {
                    ret = jsonResultObj;
                }
            });
            return ret;
        }
        catch (e) {
            return {
                Error: {
                    Message: "XML String --> JSON Object conversion failed",
                    Data: `"${xml}"`
                }
            };
        }
    }
    static xmlStrToJsonStr(xml, format = false) {
        let ret = null;
        try {
            this.parser.parseString(xml, function (err, jsonResultObj) {
                if (err) {
                    throw err;
                }
                else {
                    ret = jsonResultObj;
                }
            });
            return format
                ? JSON.stringify(ret, null, 4)
                : JSON.stringify(ret);
        }
        catch (e) {
            const error = {
                Error: {
                    Message: "XML String --> JSON String conversion failed",
                    Data: `"${xml}"`
                }
            };
            return format
                ? JSON.stringify(error, null, 4)
                : JSON.stringify(error);
        }
    }
    static jsonToXmlStr(json, format = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const xmlStr = this.x2js.js2xml(json);
                return (format)
                    ? yield this.formatXml(xmlStr)
                    : xmlStr;
            }
            catch (e) {
                const error = `<Error><Message>JSON Object --> XML String conversion failed</Message><Data>${JSON.stringify(json)}</Data></Error>`;
                return (format)
                    ? yield this.formatXml(error)
                    : error;
            }
        });
    }
    static jsonStrToXmlStr(jsonStr, format = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json = JSON.parse(jsonStr);
                const xmlStr = this.x2js.js2xml(json);
                return (format)
                    ? yield this.formatXml(xmlStr)
                    : xmlStr;
            }
            catch (_a) {
                const error = `<Error><Message>JSON String --> XML String conversion failed</Message><Data>${jsonStr}</Data></Error>`;
                return (format)
                    ? yield this.formatXml(error)
                    : error;
            }
        });
    }
    static compareDates(date1, date2) {
        if (date1.getUTCFullYear() < date2.getUTCFullYear()) {
            return -1;
        }
        if (date1.getUTCFullYear() === date2.getUTCFullYear()) {
            if (date1.getUTCMonth() < date2.getUTCMonth()) {
                return -1;
            }
            if (date1.getUTCMonth() === date2.getUTCMonth()) {
                if (date1.getUTCDate() < date2.getUTCDate()) {
                    return -1;
                }
                if (date1.getUTCDate() === date2.getUTCDate()) {
                    if (date1.getUTCHours() < date2.getUTCHours()) {
                        return -1;
                    }
                    if (date1.getUTCHours() === date2.getUTCHours()) {
                        if (date1.getUTCMinutes() < date2.getUTCMinutes()) {
                            return -1;
                        }
                        if (date1.getUTCMinutes() === date2.getUTCMinutes()) {
                            if (date1.getUTCSeconds() < date2.getUTCSeconds()) {
                                return -1;
                            }
                            if (date1.getUTCSeconds() === date2.getUTCSeconds()) {
                                if (date1.getUTCMilliseconds() < date2.getUTCMilliseconds()) {
                                    return -1;
                                }
                                if (date1.getUTCMilliseconds() === date2.getUTCMilliseconds()) {
                                    return 0;
                                }
                                return 1;
                            }
                            return 1;
                        }
                        return 1;
                    }
                    return 1;
                }
                return 1;
            }
            return 1;
        }
        return 1;
    }
}
Utilities._guidPlaceholder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
Utilities.parser = new xml2js_1.Parser({ explicitArray: false });
Utilities.x2js = new X2JS();
Utilities.TaJson = ta_json_1.JSON;
exports.default = Utilities;
//# sourceMappingURL=Utilities.js.map