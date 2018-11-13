import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { JSON as TaJson } from "ta-json";

//  Package which allows us to format XML natively (without using the browsers XML parsing ability)
import { Compiler } from "tsxml";
//  Package which allows us to convert XML --> JSON
import { Parser } from "xml2js";
//  Package which allows us to convert JSON --> XML
import * as X2JS from "x2js";

type MkDirByPathArgs = {
    isRelativeToScript?: boolean;
};

export default class Utilities {
    /*
     *  Properties & Fields
     */
    private static readonly _guidPlaceholder: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    private static readonly parser: Parser = new Parser({ explicitArray: false });
    private static readonly x2js: X2JS = new X2JS();

    public static readonly TaJson: typeof TaJson = TaJson;


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Properties & Fields
     */
    public static equal(a: any, b: any): boolean {
        if (a === b) {
            return true;
        }

        if (a && b && typeof a == 'object' && typeof b == 'object') {
            const arrA = this.isArray(a);
            const arrB = this.isArray(b);
            let i: number;
            let length: number;
            let key: string;

            if (arrA && arrB) {
                length = (a as any[]).length;

                if (length != (b as any[]).length) {
                    return false;
                }

                for (i = length; i-- !== 0;) {
                    if (!this.equal((a as any[])[i], (b as any[])[i])) {
                        return false;
                    }
                }

                return true;
            }

            if (arrA != arrB) {
                return false;
            }

            const dateA: boolean = a instanceof Date;
            const dateB: boolean = b instanceof Date;

            if (dateA != dateB) {
                return false;
            }

            if (dateA && dateB) {
                return (a as Date).getTime() == (b as Date).getTime();
            }

            const regexpA: boolean = a instanceof RegExp;
            const regexpB: boolean = b instanceof RegExp;

            if (regexpA != regexpB) {
                return false;
            }

            if (regexpA && regexpB) {
                return (a as RegExp).toString() == (b as RegExp).toString();
            }

            const keys: string[] = Object.keys(a);
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
    };


    public static hasValue(obj: any): boolean {
        return typeof (obj) !== typeof (undefined) && obj !== null;
    }


    public static hasStringValue(obj: any): boolean {
        return this.hasValue(obj) && obj.toString().length > 0;
    }


    public static hasObjectValue(obj: any): boolean {
        if (!this.isObject) {
            return false;
        }

        let i: number = 0;
        for (let key in obj) {
            i += 1;
        }
        return i > 0;
    }


    public static isArray(obj: any): boolean {
        return Array.isArray(obj) || obj instanceof Array;
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


    public static isPrimitive(obj: any): boolean {
        return this.hasValue(obj)
            && (typeof (obj) === typeof (true)
                || typeof (obj) === typeof (0)
                || typeof (obj) === typeof (""));
    }


    public static isString(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ("");
    }


    public static getErrorMessage(thrownError: any): string {
        try {
            return (thrownError as NodeJS.ErrnoException).message;
        }
        catch (e) {
            return thrownError.toString() || this.getErrorMessage(e);
        }
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


    public static async formatXml(unformattedXml: string): Promise<string> {
        try {
            return await Compiler.formatXmlString(unformattedXml);
        }
        catch (e) {
            return await this.formatXml(`<Error><Message>XML Formatting Failed</Message><Data>${unformattedXml}</Data></Error>`);
        }
    }


    public static xmlStrToJsonObj(xml: string): any {
        let ret: any = null;

        try {
            this.parser.parseString(xml, function (err: NodeJS.ErrnoException, jsonResultObj: any) {
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


    public static xmlStrToJsonStr(xml: string, format: boolean = false): string {
        let ret: any = null;

        try {
            this.parser.parseString(xml, function (err: NodeJS.ErrnoException, jsonResultObj: any) {
                if (err) {
                    throw err;
                }
                else {
                    ret = jsonResultObj;
                }
            });

            return format
                ? JSON.stringify(ret, null, 4)
                : JSON.stringify(ret)
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
                : JSON.stringify(error)
        }
    }


    public static async jsonToXmlStr(json: Object, format: boolean = false): Promise<string> {
        try {
            const xmlStr: string = this.x2js.js2xml(json);
            return (format)
                ? await this.formatXml(xmlStr)
                : xmlStr;
        }
        catch (e) {
            const error: string = `<Error><Message>JSON Object --> XML String conversion failed</Message><Data>${JSON.stringify(json)}</Data></Error>`;
            return (format)
                ? await this.formatXml(error)
                : error;
        }
    }


    public static async jsonStrToXmlStr(jsonStr: string, format: boolean = false): Promise<string> {
        try {
            const json: Object = JSON.parse(jsonStr);
            const xmlStr: string = this.x2js.js2xml(json);
            return (format)
                ? await this.formatXml(xmlStr)
                : xmlStr;
        }
        catch {
            const error: string = `<Error><Message>JSON String --> XML String conversion failed</Message><Data>${jsonStr}</Data></Error>`;
            return (format)
                ? await this.formatXml(error)
                : error;
        }
    }
}