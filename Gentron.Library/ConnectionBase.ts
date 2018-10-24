import Guid from "./utils/Guid";
import IIdentifiable from "./interfaces/IIdentifiable";
import IJsonSerializable from "./interfaces/IJsonSerializable";
import IModifiable from "./interfaces/IModifiable";

export interface IConnectionBase extends IJsonSerializable, IIdentifiable, IModifiable<IConnectionBase> {
    /*
     *  Properties & Fields 
     */
    IsActive: boolean;
}

export abstract class ConnectionBase implements IConnectionBase {
    /*
     *  Properties & Fields 
     */
    private readonly _id: string;

    public get ID(): string {
        return this._id;
    }

    private _isActive: boolean;

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
        this._id = Guid.newCryptoGuid();
        this._isActive = true;
    }


    /*
     *  Methods
     */
    public abstract toJson(): any;

    public abstract update(connection: IConnectionBase): void;
}