import { ICloneable, IJsonSerializable, IModifiable, IActivateable } from "./interfaces";
import { Cloneable } from "./abstract";
import { NonFunctionProperties } from "./types";

export interface IEnvironment extends IActivateable, ICloneable<IEnvironment>, IJsonSerializable<IEnvironment>, IModifiable<IEnvironment> {
    /*
     *  Properties & Fields
     */
    Name: string;
}

export class Environment extends Cloneable<IEnvironment> implements IEnvironment {
    /*
     *  Properties & Fields
     */
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
        super();
        this._isActive = false;
        this._name = "";
    }


    /*
     *  Methods
     */
    public fromJson(json: NonFunctionProperties<IEnvironment>): IEnvironment {
        this._id = json.ID;
        this._isActive = json.IsActive;
        this._name = json.Name;

        return this;
    }

    public toJson(): NonFunctionProperties<IEnvironment> {
        return {
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
        };
    }

    public clone(): IEnvironment {
        const ret: Environment = new Environment();

        ret._id = this._id;
        ret._isActive = this._isActive;
        ret._name = this._name;

        return ret;
    }

    public update(environment: IEnvironment): void {
        this._isActive = environment.IsActive;
        this._name = environment.Name;
    }
}