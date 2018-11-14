import { File, Template, Utilities } from "./";
import { FileJsonConverter } from "./converters";
import { JsonConverter, JsonObject, JsonProperty, JsonType } from "ta-json";
import SourceBase from "./SourceBase";

@JsonObject()
export default class Engine extends SourceBase<Engine> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonType(File)
    @JsonConverter(FileJsonConverter)
    public EngineCode: File;

    @JsonProperty()
    @JsonType(Template)
    public Templates: Template[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.EngineCode = new File();
        this.Templates = [];
    }


    /*
     *  Methods
     */
    public clone(): Engine {
        const ret: Engine = new Engine();

        ret._id = this._id;
        ret.EngineCode = this.EngineCode.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Templates = this.Templates.map((template: Template, index: number) => {
            return template.clone();
        });

        return ret;
    }


    public update(engine: Engine): void {
        if (!Utilities.hasValue(engine)) {
            return;
        }

        this.EngineCode.update(engine.EngineCode);
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}