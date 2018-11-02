import { IIdentifiable } from "../interfaces";
import { Utilities } from "../";

export default abstract class Identifiable implements IIdentifiable {
    /*
     *  Properties & Fields
     */
    protected readonly _id: string;

    public get ID(): string {
        return this._id;
    }


    /*
     *  Constructors
     */
    public constructor(id?: string) {
        this._id = id || Utilities.newCryptoGuid();
    }
}