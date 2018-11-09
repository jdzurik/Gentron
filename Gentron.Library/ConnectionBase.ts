import { Cloneable } from "./abstract";
import { IActivateable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export abstract class ConnectionBase<T> extends Cloneable<T> implements IActivateable, IModifiable<T> {
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
    public abstract clone(): T;

    public abstract update(connection: T): void;
}