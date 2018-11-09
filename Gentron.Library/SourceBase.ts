import { Cloneable } from "./abstract";
import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export abstract class SourceBase<T> extends Cloneable<T> implements IActivateable, ICloneable<T>, IModifiable<T> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public IsActive: boolean;

    @JsonProperty()
    public Name: string;

    @JsonProperty()
    public Result: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.IsActive = true;
        this.Name = "";
        this.Result = "";
    }


    /*
     *  Methods
     */
    public abstract clone(): T;

    public abstract update(source: T): void;
}