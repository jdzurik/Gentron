import { ICloneable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from ".";

export interface IOutputPath extends ICloneable<IOutputPath>, IModifiable<IOutputPath> {
    /*
     *  Properties & Fields
     */
    Environment: string;
    Path: string;
}

@JsonObject()
export class OutputPath extends Cloneable<IOutputPath> implements IOutputPath {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public Environment: string;

    @JsonProperty()
    public Path: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Environment = "";
        this.Path = "";
    }


    /*
     *  Methods
     */
    public clone(): IOutputPath {
        const ret: OutputPath = new OutputPath();

        ret._id = this._id;
        ret.Environment = this.Environment;
        ret.Path = this.Path;

        return ret;
    }

    public update(outputPath: IOutputPath): void {
        if (!Utilities.hasValue(outputPath)) {
            return;
        }

        this.Environment = outputPath.Environment;
        this.Path = outputPath.Path;
    }
}