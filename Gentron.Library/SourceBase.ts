import { Utilities } from ".";
import { IIdentifiable, IJsonSerializable, IModifiable, IActivateable, ICloneable } from "./interfaces";
import { NonFunctionProperties } from "./types";
import { Cloneable } from "./abstract";

export interface ISourceBase extends IActivateable, ICloneable<ISourceBase>, IJsonSerializable<ISourceBase>, IModifiable<ISourceBase> {
    /*
     *  Properties & Fields 
     */
    Name: string;
    Result: string;
}

export abstract class SourceBase extends Cloneable<ISourceBase> implements ISourceBase {
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


    protected _name: string;

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }


    protected _result: string;

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
        super();
        this._id = Utilities.newCryptoGuid();
        this._isActive = true;
        this._name = "";
        this._result = "";
    }


    /*
     *  Methods
     */
    public abstract clone(): ISourceBase;

    public abstract fromJson(json: NonFunctionProperties<ISourceBase>): ISourceBase;

    public abstract toJson(): NonFunctionProperties<ISourceBase>;

    public abstract update(source: ISourceBase): void;
}