import { JsonSerializable } from "./";
import { ICloneable } from "../interfaces";
import { Utilities } from "../";

export default abstract class Cloneable<T extends ICloneable<T>> extends JsonSerializable<T> implements ICloneable<T> {
    /*
     *  Properties & Fields 
     */
    protected readonly _id: string;

    public get ID(): string {
        return (this._isClone && this._cloneId)
            ? this._cloneId
            : this._id;
    }


    public _cloneId: string = "";
    public _isClone: boolean = false;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._id = Utilities.newCryptoGuid();
        this.IgnoreFields.push("_cloneId");
        this.IgnoreFields.push("_isClone");
    }


    /*
     *  Methods
     */
    public abstract clone(): T;
}