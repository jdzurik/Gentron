import { Cloneable } from "./abstract";
import { IActivateable, ICloneable, IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";

export interface IConnectionBase extends IActivateable, ICloneable<IConnectionBase>, IIdentifiable, IJsonSerializable<IConnectionBase>, IModifiable<IConnectionBase> {

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
    public abstract clone(): IConnectionBase;

    public abstract update(connection: IConnectionBase): void;
}