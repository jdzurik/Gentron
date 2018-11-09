import { Cloneable } from "./abstract";
import { IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from ".";

export enum TemplateTypes {
    Partial,
    Primary,
}

@JsonObject()
export class Template extends Cloneable<Template> implements IModifiable<Template> {
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
    public clone(): Template {
        const ret: Template = new Template();

        ret._id = this._id;
        ret.Name = this.Name;
        ret.Type = this.Type;

        return ret;
    }


    public update(template: Template): void {
        if (!Utilities.hasValue(template)) {
            return;
        }

        this.Name = template.Name;
        this.Type = template.Type;
    }
}