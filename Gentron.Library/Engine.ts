import { SourceBase } from "./SourceBase";
import { ITemplate, Template } from "./Template";
import { JsonObject, JsonProperty, JsonType } from "ta-json";
import { Utilities } from ".";

@JsonObject()
export class Engine extends SourceBase<Engine> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonType(Template)
    public Templates: ITemplate[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Templates = [];
    }


    /*
     *  Methods
     */
    public clone(): Engine {
        const ret: Engine = new Engine();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Templates = this.Templates.map((template: ITemplate, index: number) => {
            return template.clone();
        });

        return ret;
    }


    public update(engine: Engine): void {
        if (!Utilities.hasValue(engine)) {
            return;
        }

        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}