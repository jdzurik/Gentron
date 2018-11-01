import { IActivateable, ICloneable, IJsonSerializable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";

export interface IConnectionBase extends IActivateable, ICloneable<IConnectionBase>, IJsonSerializable, IModifiable<IConnectionBase> {

}

export abstract class ConnectionBase extends Cloneable<IConnectionBase> implements IConnectionBase {
    /*
     *  Properties & Fields 
     */
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
        super();
        this._isActive = true;
    }


    /*
     *  Methods
     */
    public abstract toJson(): any;

    public abstract clone(): IConnectionBase;

    public abstract update(connection: IConnectionBase): void;
}