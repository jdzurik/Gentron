"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Utilities {
    static hasValue(obj) {
        return typeof (obj) !== typeof (undefined) && obj !== null;
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
    static isString(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ("");
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
}
Utilities._guidPlaceholder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
exports.default = Utilities;
