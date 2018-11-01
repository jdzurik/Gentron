import { ICloneable } from "../interfaces";
import { Utilities } from "../";

export default abstract class Cloneable<T> implements ICloneable<T> {
    /*
     *  Properties & Fields 
     */
    protected readonly _id: string;

    public get ID(): string {
        return (this._isClone && this._cloneId)
            ? this._cloneId
            : this._id;
    }

    protected _cloneId: string = "";
    protected _isClone: boolean = false;


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