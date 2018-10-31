import * as crypto from "crypto";

export default class Utilities {
    private static _guidPlaceholder: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

    private static readonly _booleanType = typeof (true);
    private static readonly _functionType = typeof (() => { });
    private static readonly _numberType = typeof (0);
    private static readonly _objectType = typeof ({});
    private static readonly _stringType = typeof ("");
    private static readonly _symbolType = typeof (Symbol);
    private static readonly _undefinedType = typeof (undefined);

    public static readonly ObjectPrototype = Object.getPrototypeOf({});

    public static hasValue(obj: any): boolean {
        return !this.isUndefined(obj) && obj !== null;
    }

    public static isArray(obj: any): boolean {
        return Array.isArray(obj) || obj instanceof Array;
    }

    public static isBoolean(obj: any): boolean {
        return typeof (obj) === this._booleanType;
    }

    public static isFunction(obj: any): boolean {
        return typeof (obj) === this._functionType;
    }

    public static isNumber(obj: any): boolean {
        return typeof (obj) === this._numberType;
    }

    public static isObject(obj: any): boolean {
        return typeof (obj) === this._objectType;
    }

    public static isString(obj: any): boolean {
        return typeof (obj) === this._stringType;
    }

    public static isSymbol(obj: any): boolean {
        return typeof (obj) === this._symbolType;
    }

    public static isUndefined(obj: any): boolean {
        return typeof (obj) === this._undefinedType;
    }

    public static isPrimitive(obj: any): boolean {
        return this.isBoolean(obj) || this.isNumber(obj) || this.isString(obj);
    }

    public static newGuid(): string {
        return this._guidPlaceholder.replace(/[xy]/g, function (substring: string) {
            const rand: number = Math.random() * 16 | 0;
            const ret = (substring === "x")
                ? rand
                : (rand & 0x3 | 0x8);
            return ret.toString(16);
        });
    }


    public static newCryptoGuid(): string {
        const hex: string[] = [];

        for (var i = 0; i < 256; i++) {
            hex[i] = (i < 16 ? "0" : "") + (i).toString(16);
        }

        const rand: Uint8Array = new Uint8Array(16);
        for (let i: number = 0; i < rand.length; ++i) {
            rand[i] = Math.floor(Math.random() * 10);
        }

        rand[6] = rand[6] & 0x0f | 0x40;
        rand[8] = rand[8] & 0x3f | 0x80;

        return (
            hex[rand[0]] +
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
            hex[rand[15]]
        );
    }
}