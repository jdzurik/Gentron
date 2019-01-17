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
const ta_json_1 = require("ta-json");
const tsxml_1 = require("tsxml");
const xml2js_1 = require("xml2js");
const X2JS = require("x2js");
class SerializationUtils {
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
                    Message: 'XML String --> JSON String conversion failed',
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
}
SerializationUtils.parser = new xml2js_1.Parser({ explicitArray: false });
SerializationUtils.x2js = new X2JS();
SerializationUtils.TaJson = ta_json_1.JSON;
exports.default = SerializationUtils;
//# sourceMappingURL=SerializationUtils.js.map