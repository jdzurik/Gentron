import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";
import { JsonObject, JsonProperty } from "ta-json";

export interface IConnectionBase extends IActivateable, ICloneable<IConnectionBase>, IModifiable<IConnectionBase> { }

@JsonObject()
export abstract class ConnectionBase extends Cloneable<IConnectionBase> implements IConnectionBase {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public IsActive: boolean;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.IsActive = true;
    }


    /*
     *  Methods
     */
    public abstract clone(): IConnectionBase;

    public abstract update(connection: IConnectionBase): void;
}