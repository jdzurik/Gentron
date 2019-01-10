import * as vm from "vm";
import SourceBase from "./SourceBase";
import { CodeEngineFileJsonConverter, ActiveOutputPathGroupConverter } from "./converters";
import { JsonConverter, JsonObject, JsonProperty, JsonType, JsonElementType } from "ta-json";
import { TemplateTypes } from "./types";
import { Template, VMUtils, ObjectUtils, EngineCodeFile, OutputPathGroup, OutputPath } from "./";
import { FileParserUtils } from "./utils";

@JsonObject()
export default class Engine extends SourceBase<Engine> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(OutputPathGroup)
    @JsonConverter(ActiveOutputPathGroupConverter)
    public ActiveOutputPathGroup: OutputPathGroup<OutputPath>;


    @JsonProperty()
    @JsonType(EngineCodeFile)
    @JsonConverter(CodeEngineFileJsonConverter)
    public EngineCode: EngineCodeFile;

    public get HasPrimaryTemplate(): boolean {
        return (this.Templates || []).filter(t => t.Type === TemplateTypes.Primary).length === 1;
    }

    public get HasPartialTemplates(): boolean {
        return (this.Templates || []).filter(t => t.Type === TemplateTypes.Partial).length >= 1;
    }

    @JsonProperty()
    @JsonType(Template)
    public Templates: Template[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ActiveOutputPathGroup = new OutputPathGroup<OutputPath>();
        this.EngineCode = new EngineCodeFile();
        this.Templates = [];
    }


    /*
     *  Methods
     */
    public clone(): Engine {
        const ret: Engine = new Engine();

        ret._id = this._id;
        ret.ActiveOutputPathGroup = this.ActiveOutputPathGroup.clone();
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

        let vmState: any = {
            jsonObj: results,
            globalScope: {
                templateResult: ''
            }
        };

        if ((this.Templates || []).length > 0 && this.HasPrimaryTemplate && this.HasPartialTemplates) {
            vmState.templateTexts = this.Templates.map(t => {
                return {
                    Contents: t.TemplateCode.Contents,
                    Name: t.Name,
                    Type: t.Type,
                }
            });
        }
        else {
            vmState.templateText = this.Templates[0].TemplateCode.Contents;
        }

        const ctx: vm.Context = VMUtils.createContext(this.EngineCode.toModuleListOptions(), vmState);
        vm.runInNewContext(this.EngineCode.ModifiedContents, ctx);

        //  TODO
        //  this.ActiveOutputPathGroup.Paths[0].Path is hardcoded to grab the first environment (Dev)
        //  from the active output path group. Need to figure out some way to pass in environment
        FileParserUtils.parseAndWriteFiles(vmState.globalScope.templateResult, this.ActiveOutputPathGroup.Paths[0].Path);
    }


    public testScript(moduleSource: string): void {
        const ctx = VMUtils.createContext(this.EngineCode.toModuleListOptions(), {});
        vm.runInNewContext(moduleSource, ctx);
    }


    public update(engine: Engine): void {
        if (!ObjectUtils.hasValue(engine)) {
            return;
        }

        this.ActiveOutputPathGroup = engine.ActiveOutputPathGroup;
        this.EngineCode.update(engine.EngineCode);
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}