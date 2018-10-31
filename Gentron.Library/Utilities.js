"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utilities {
    static hasValue(obj) {
        return !this.isUndefined(obj) && obj !== null;
    }
    static isArray(obj) {
        return Array.isArray(obj) || obj instanceof Array;
    }
    static isBoolean(obj) {
        return typeof (obj) === this._booleanType;
    }
    static isFunction(obj) {
        return typeof (obj) === this._functionType;
    }
    static isNumber(obj) {
        return typeof (obj) === this._numberType;
    }
    static isObject(obj) {
        return typeof (obj) === this._objectType;
    }
    static isString(obj) {
        return typeof (obj) === this._stringType;
    }
    static isSymbol(obj) {
        return typeof (obj) === this._symbolType;
    }
    static isUndefined(obj) {
        return typeof (obj) === this._undefinedType;
    }
    static isPrimitive(obj) {
        return this.isBoolean(obj) || this.isNumber(obj) || this.isString(obj);
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
        for (var i = 0; i < 256; i++) {
            hex[i] = (i < 16 ? "0" : "") + (i).toString(16);
        }
        const rand = new Uint8Array(16);
        for (let i = 0; i < rand.length; ++i) {
            rand[i] = Math.floor(Math.random() * 10);
        }
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
Utilities._booleanType = typeof (true);
Utilities._functionType = typeof (() => { });
Utilities._numberType = typeof (0);
Utilities._objectType = typeof ({});
Utilities._stringType = typeof ("");
Utilities._symbolType = typeof (Symbol);
Utilities._undefinedType = typeof (undefined);
Utilities.ObjectPrototype = Object.getPrototypeOf({});
exports.default = Utilities;
