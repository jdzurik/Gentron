import { Cloneable } from "./abstract";
import { ICloneable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from ".";

export enum TemplateTypes {
    Partial,
    Primary,
}

export interface ITemplate extends ICloneable<ITemplate>, IModifiable<ITemplate> {
    Name: string;
    Type: TemplateTypes;
}

@JsonObject()
export class Template extends Cloneable<ITemplate> implements ITemplate {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public Name: string;

    @JsonProperty()
    public Type: TemplateTypes;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Name = "";
        this.Type = TemplateTypes.Partial;
    }


    /*
     *  Methods
     */
    public clone(): ITemplate {
        const ret: Template = new Template();

        ret._id = this._id;
        ret.Name = this.Name;
        ret.Type = this.Type;

        return ret;
    }


    public update(template: ITemplate): void {
        if (!Utilities.hasValue(template)) {
            return;
        }

        this.Name = template.Name;
        this.Type = template.Type;
    }
}