import { IActivateable, ICloneable, IJsonSerializable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";
import { NonFunctionProperties } from "./types";

export interface IConnectionBase extends IActivateable, ICloneable<IConnectionBase>, IJsonSerializable<IConnectionBase>, IModifiable<IConnectionBase> {

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
    public abstract fromJson(json: NonFunctionProperties<IConnectionBase>): IConnectionBase;

    public abstract toJson(): NonFunctionProperties<IConnectionBase>;

    public abstract clone(): IConnectionBase;

    public abstract update(connection: IConnectionBase): void;
}