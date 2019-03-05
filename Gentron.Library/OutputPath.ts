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
    public Name: string;

    @JsonProperty()
    public BasePath: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Name = '';
        this.BasePath = '';
    }


    /*
     *  Methods
     */
    public clone(): OutputPath {
        const ret: OutputPath = new OutputPath();

        ret._id = this._id;
        ret.Name = this.Name;
        ret.BasePath = this.BasePath;

        return ret;
    }

    public update(outputPath: OutputPath): void {
        if (!ObjectUtils.hasValue(outputPath)) {
            return;
        }

        this.Name = outputPath.Name;
        this.BasePath = outputPath.BasePath;
    }
}