import { Utilities } from ".";
import { IIdentifiable, IJsonSerializable, IModifiable, IActivateable } from "./interfaces";

export interface IEnvironment extends IActivateable, IJsonSerializable, Readonly<IIdentifiable>, IModifiable<IEnvironment> {
    /*
     *  Properties & Fields
     */
    Name: string;
}

export class Environment implements IEnvironment {
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


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Utilities.newCryptoGuid();
        this._isActive = false;
        this._name = "";
    }


    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public update(environment: IEnvironment): void {
        this._isActive = environment.IsActive;
        this._name = environment.Name;
    }
}