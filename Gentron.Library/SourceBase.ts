﻿import { Utilities } from ".";
import { IIdentifiable, IJsonSerializable, IModifiable, IActivateable } from "./interfaces";
import { JsonSerializable } from "./abstract";

export interface ISourceBase extends IActivateable, IJsonSerializable<ISourceBase>, IIdentifiable, IModifiable<ISourceBase> {
    /*
     *  Properties & Fields 
     */
    Name: string;
    Result: string;
}

export abstract class SourceBase extends JsonSerializable<ISourceBase> implements ISourceBase {
    /*
     *  Properties & Fields 
     */
    protected readonly _id: string;

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
    public abstract update(source: ISourceBase): void;
}