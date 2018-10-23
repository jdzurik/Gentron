import Guid from "./utils/Guid";
import IJsonSerializable from "./interfaces/IJsonSerializable";

export interface ISourceBase extends IJsonSerializable {
    /*
     *  Properties & Fields 
     */
    readonly ID: string;
    IsActive: boolean;
    Name: string;
    Result: string;

    /*
     *  Methods
     */
    update(source: ISourceBase): void;
}

export abstract class SourceBase implements ISourceBase {
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


    private _name: string;

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }


    private _result: string;

    public get Result(): string {
        return this._result;
    }

    public set Result(value: string) {
        this._result = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Guid.newCryptoGuid();
        this._isActive = true;
        this._name = "";
        this._result = "";
    }


    /*
     *  Methods
     */
    public abstract toJson(): any;

    public abstract update(source: ISourceBase): void;
}