import { ISourceBase, SourceBase } from "./SourceBase";
import { ITemplate, Template } from "./Template";
import { JsonObject, JsonProperty, JsonType } from "ta-json";

export interface IEngine extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    Templates: ITemplate[];
}

@JsonObject()
export class Engine extends SourceBase implements IEngine {
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
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}