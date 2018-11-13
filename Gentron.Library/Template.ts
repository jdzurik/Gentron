﻿import { Cloneable } from "./abstract";
import { IModifiable } from "./interfaces";
import { JsonObject, JsonProperty, JsonType } from "ta-json";
import { File, Utilities } from "./";

enum TemplateTypes {
    Partial,
    Primary,
}

@JsonObject()
export default class Template extends Cloneable<Template> implements IModifiable<Template> {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public Name: string;

    @JsonProperty()
    @JsonType(File)
    public TemplateCode: File;

    @JsonProperty()
    public Type: TemplateTypes;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Name = "";
        this.TemplateCode = new File();
        this.Type = TemplateTypes.Partial;
    }


    /*
     *  Methods
     */
    public clone(): Template {
        const ret: Template = new Template();

        ret._id = this._id;
        ret.Name = this.Name;
        ret.TemplateCode = this.TemplateCode.clone();
        ret.Type = this.Type;

        return ret;
    }


    public update(template: Template): void {
        if (!Utilities.hasValue(template)) {
            return;
        }

        this.Name = template.Name;
        this.TemplateCode.update(template.TemplateCode);
        this.Type = template.Type;
    }
}