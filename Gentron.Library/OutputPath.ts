import { Cloneable } from "./abstract";
import { IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";

@JsonObject()
export default class OutputPath extends Cloneable<OutputPath> implements IModifiable<OutputPath> {
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
        this.Environment = '';
        this.Path = '';
    }


    /*
     *  Methods
     */
    public clone(): OutputPath {
        const ret: OutputPath = new OutputPath();

        ret._id = this._id;
        ret.Environment = this.Environment;
        ret.Path = this.Path;

        return ret;
    }

    public update(outputPath: OutputPath): void {
        if (!ObjectUtils.hasValue(outputPath)) {
            return;
        }

        this.Environment = outputPath.Environment;
        this.Path = outputPath.Path;
    }
}