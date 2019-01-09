import { JSON as TaJson } from "ta-json";

//  Package which allows us to format XML natively (without using the browsers XML parsing ability)
import { Compiler } from "tsxml";
//  Package which allows us to convert XML --> JSON
import { Parser } from "xml2js";
//  Package which allows us to convert JSON --> XML
import * as X2JS from "x2js";

export default class SerializationUtils {
    /*
     *  Properties & Fields
     */
    private static readonly parser: Parser = new Parser({ explicitArray: false });
    private static readonly x2js: X2JS = new X2JS();

    public static readonly TaJson: typeof TaJson = TaJson;
    

    /*
     *  Methods
     */
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
                    Message: 'XML String --> JSON String conversion failed',
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