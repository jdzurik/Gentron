import { Utilities } from ".";
import { IActivateable, ICloneable, IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";

export interface IConnectionBase extends IActivateable, ICloneable<IConnectionBase>, IIdentifiable, IJsonSerializable, IModifiable<IConnectionBase> {

}

export abstract class ConnectionBase implements IConnectionBase {
    /*
     *  Properties & Fields 
     */
    protected _id: string;

    public get ID(): string {
        return this._id;
    }

    protected _isActive: boolean;

    public get IsActive(): boolean {
        return this._isActive;
    }

    public set IsActive(value: boolean) {
        this._isActive = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Utilities.newCryptoGuid();
        this._isActive = true;
    }


    /*
     *  Methods
     */
    public abstract toJson(): any;

    public abstract clone(): IConnectionBase;

    public abstract update(connection: IConnectionBase): void;
}