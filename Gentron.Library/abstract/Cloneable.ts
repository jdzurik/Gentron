import { ICloneable, IIdentifiable } from "../interfaces";
import { Utilities } from "../";

export default abstract class Cloneable<T> implements ICloneable<T>, IIdentifiable {
    /*
     *  Properties & Fields 
     */
    protected _id: string;

    public get ID(): string {
        return this._id;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Utilities.newCryptoGuid();
    }


    /*
     *  Methods
     */
    public abstract clone(): T;
}