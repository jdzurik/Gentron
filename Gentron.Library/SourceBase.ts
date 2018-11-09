import { Utilities } from ".";
import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { Cloneable } from "./abstract";

export interface ISourceBase<T extends ISourceBase<T>> extends IActivateable, ICloneable<T>, IModifiable<T> {
    /*
     *  Properties & Fields 
     */
    Name: string;
    Result: string;
}

@JsonObject()
export abstract class SourceBase<T extends ISourceBase<T>> extends Cloneable<T> implements ISourceBase<T> {
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