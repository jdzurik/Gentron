import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { JSON } from "ta-json";

type MkDirByPathArgs = {
    isRelativeToScript?: boolean;
};

export default class Utilities {
    /*
     *  Properties & Fields
     */
    private static _guidPlaceholder: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

    public static readonly JSON: typeof JSON = JSON;


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Properties & Fields
     */
    public static hasValue(obj: any): boolean {
        return typeof (obj) !== typeof (undefined) && obj !== null;
    }


    public static hasStringValue(obj: any): boolean {
        return this.hasValue(obj) && obj.toString().length > 0;
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


    /*
     *  Taken from: https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
     */
    public static mkDirByPathSync(targetDir: string, args: MkDirByPathArgs = {}) {
        const sep: "\\" | "/" = path.sep;
        const initDir: string = path.isAbsolute(targetDir)
            ? sep
            : '';
        const baseDir: string = args.isRelativeToScript
            ? __dirname
            : '.';

        return targetDir.split(sep).reduce((parentDir: string, childDir: string) => {
            const curDir: string = path.resolve(baseDir, parentDir, childDir);

            try {
                fs.mkdirSync(curDir);
            } catch (err) {
                //  curDir already exists!
                if (err.code === "EEXIST") {
                    return curDir;
                }

                //  To avoid `EISDIR` error on Mac and 
                //  `EACCES`-- > `ENOENT` and`EPERM` on Windows.
                if (err.code === 'ENOENT') {
                    // Throw the original parentDir error on curDir `ENOENT` failure.
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }

                const caughtErr: boolean = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                    // Throw if it's just the last created dir.
                    throw err;
                }
            }

            return curDir;
        }, initDir);
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

        for (let i: number = 0; i < 256; i++) {
            hex[i] = (i < 16 ? "0" : "") + (i).toString(16);
        }

        const rand = new Uint8Array(16);
        crypto.randomFillSync(rand);

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