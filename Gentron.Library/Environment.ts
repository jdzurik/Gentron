import { IActivateable, ICloneable, IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";

export interface IEnvironment extends IActivateable, ICloneable<IEnvironment>, IJsonSerializable<IEnvironment>, IIdentifiable, IModifiable<IEnvironment> {
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
    public clone(): IEnvironment {
        const ret: Environment = new Environment();

        ret._cloneId = this._id;
        ret._isActive = this._isActive;
        ret._isClone = true;
        ret._name = this._name;

        return ret;
    }

    public update(environment: IEnvironment): void {
        this._isActive = environment.IsActive;
        this._name = environment.Name;
    }
}