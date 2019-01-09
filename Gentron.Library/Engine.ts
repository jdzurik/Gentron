import SourceBase from "./SourceBase";
import { File, Template, VMUtils, ObjectUtils, EngineCodeFile } from "./";
import { CodeEngineFileJsonConverter } from "./converters";
import { JsonConverter, JsonObject, JsonProperty, JsonType } from "ta-json";
import { ModuleList, ModulePackage } from "./types";
import * as vm from "vm";

@JsonObject()
export default class Engine extends SourceBase<Engine> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonType(EngineCodeFile)
    @JsonConverter(CodeEngineFileJsonConverter)
    public EngineCode: EngineCodeFile;

    @JsonProperty()
    @JsonType(Template)
    public Templates: Template[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.EngineCode = new EngineCodeFile();
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


    public execute(dirname: string, localPackageFolder: string, results: any): void {
        this.EngineCode.resolveModulesRelativePaths(dirname, localPackageFolder);

        for (let i: number = 0; i < this.Templates.length; ++i) {
            const ctx = VMUtils.createContext(
                this.EngineCode.toModuleListOptions(),
                {
                    templateText: this.Templates[i].TemplateCode.Contents,
                    jsonObj: results
                }
            );

            vm.runInNewContext(this.EngineCode.ModifiedContents, ctx);
        }
    }


    public testScript(moduleSource: string): void {
        const ctx = VMUtils.createContext(this.EngineCode.toModuleListOptions(), {});
        vm.runInNewContext(moduleSource, ctx);
    }


    public update(engine: Engine): void {
        if (!ObjectUtils.hasValue(engine)) {
            return;
        }

        this.EngineCode.update(engine.EngineCode);
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}