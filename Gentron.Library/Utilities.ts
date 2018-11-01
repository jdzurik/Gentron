﻿import * as crypto from "crypto";

export default class Utilities {
    private static _guidPlaceholder: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

    public static hasValue(obj: any): boolean {
        return typeof (obj) !== typeof (undefined) && obj !== null;
    }

    public static isBoolean(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof (true);
    }

    public static isFunction(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ((() => { }));
    }

    public static isObject(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ({});
    }

    public static isNumber(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof (0);
    }

    public static isString(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ("");
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