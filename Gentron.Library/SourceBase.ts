import { Utilities } from ".";
import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { Cloneable } from "./abstract";

export interface ISourceBase extends IActivateable, ICloneable<ISourceBase>, IModifiable<ISourceBase> {
    /*
     *  Properties & Fields 
     */
    Name: string;
    Result: string;
}

@JsonObject()
export abstract class SourceBase extends Cloneable<ISourceBase> implements ISourceBase {
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
    public abstract clone(): ISourceBase;

    public abstract update(source: ISourceBase): void;
}