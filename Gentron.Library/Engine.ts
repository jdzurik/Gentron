import { ISourceBase, SourceBase } from "./SourceBase";
import { ITemplate, Template } from "./Template";
import { JsonObject, JsonProperty, JsonType } from "ta-json";
import { Utilities } from ".";

export interface IEngine extends ISourceBase<IEngine> {
    /*
     *  Properties & Fields 
     */
    Templates: ITemplate[];
}

@JsonObject()
export class Engine extends SourceBase<IEngine> implements IEngine {
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
    public clone(): IEngine {
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


    public update(engine: IEngine): void {
        if (!Utilities.hasValue(engine)) {
            return;
        }

        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}