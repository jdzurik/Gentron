import * as crypto from "crypto";

export default class GuidUtils {
    /*
     *  Properties & Fields
     */
    private static readonly _guidPlaceholder: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';


    /*
     *  Methods
     */    
    public static newGuid(): string {
        return this._guidPlaceholder.replace(/[xy]/g, function (substring: string) {
            const rand: number = Math.random() * 16 | 0;
            const ret = (substring === 'x')
                ? rand
                : (rand & 0x3 | 0x8);
            return ret.toString(16);
        });
    }


    public static newCryptoGuid(): string {
        const hex: string[] = [];

        for (let i: number = 0; i < 256; i++) {
            hex[i] = (i < 16 ? '0' : '') + (i).toString(16);
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