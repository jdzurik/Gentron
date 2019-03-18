import * as vm from 'vm';
import SourceBase from './SourceBase';
import { CodeEngineFileJsonConverter, ActiveOutputPathGroupConverter } from './converters';
import { JsonConverter, JsonObject, JsonProperty, JsonType, JsonElementType } from 'ta-json';
import { TemplateTypes } from './types';
import { Template, VMUtils, ObjectUtils, EngineCodeFile, OutputPathGroup, OutputPath, Gentron } from './';
import { FileParserUtils } from './utils';
const { fork } = require('child_process');

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
        return (this.Templates || []).filter((t) => t.Type === TemplateTypes.Primary).length === 1;
    }

    public get HasPartialTemplates(): boolean {
        return (this.Templates || []).filter((t) => t.Type === TemplateTypes.Partial).length >= 1;
    }

    @JsonProperty()
    @JsonType(Template)
    public Templates: Template[];

    public OutputResult: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ActiveOutputPathGroup = new OutputPathGroup<OutputPath>();
        this.EngineCode = new EngineCodeFile();
        this.Templates = [];
        this.OutputResult = '';
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
        ret.OutputResult = this.OutputResult;
        ret.Templates = this.Templates.map((template: Template, index: number) => {
            return template.clone();
        });

        return ret;
    }

    public run(localPackageFolder: string, results: any, callback: any) {

        const forkSubState: any = {
            jsonObj: results,
            templateTexts: [],
        };
        // , stdio: [process.stdin, process.stdout, process.stderr, 'ipc']
        const forked = fork(this.EngineCode.Path, [], { cdw: localPackageFolder,  silent: true});
        const ForkResults: string = '';
        if ((this.Templates || []).length > 0) {
            if (this.HasPrimaryTemplate && this.HasPartialTemplates) {
                forkSubState.templateTexts = this.Templates.map((t) => {
                    return {
                        Contents: t.TemplateCode.Contents,
                        Name: t.Name,
                        Type: t.Type,
                    };
                });
            } else {
                forkSubState.templateTexts.push(this.Templates[0].TemplateCode.Contents);
            }
        }
        const errordata: any = [];
        forked.on('message', (m: string) => {
            console.log('message return');
            this.OutputResult = m;
            FileParserUtils.parseAndWriteFiles(m, this.ActiveOutputPathGroup.Paths[0].BasePath);
            callback(m);
        });

        forked.send(forkSubState, null, {keepOpen : true}, () => {
            console.log('Sent fork substate');
        });

        forked.stderr.on('data', (data: any) => {
            console.log('stderr: ' + data);
            errordata.push(data);
            // callback(data);
        });

        // forked.stdout.on('data', (data:any) => {
        //     console.log(`stdout: ${data}`);
        //   });

        forked.on('exit', (code: any) => {
           if (code !== 0) {
               console.log('Failed: ' + code);
               callback(errordata);
            }

        });
        // console.log( this.OutputResult);
    }

    public execute(dirname: string, localPackageFolder: string, results: any): void {
        this.EngineCode.resolveModulesRelativePaths(dirname, localPackageFolder);

        const vmState: any = {
            jsonObj: results,
            globalScope: {
                templateResult: '',
            },
        };

        if ((this.Templates || []).length > 0 && this.HasPrimaryTemplate && this.HasPartialTemplates) {
            vmState.templateTexts = this.Templates.map((t) => {
                return {
                    Contents: t.TemplateCode.Contents,
                    Name: t.Name,
                    Type: t.Type,
                };
            });
        } else {
            vmState.templateText = this.Templates[0].TemplateCode.Contents;
        }

        const ctx: vm.Context = VMUtils.createContext(this.EngineCode.toModuleListOptions(), vmState);
        vm.runInNewContext(this.EngineCode.ModifiedContents, ctx);

        //  TODO
        //  this.ActiveOutputPathGroup.Paths[0].Path is hardcoded to grab the first environment (Dev)
        //  from the active output path group. Need to figure out some way to pass in environment
        FileParserUtils.parseAndWriteFiles(
            vmState.globalScope.templateResult,
            this.ActiveOutputPathGroup.Paths[0].BasePath);
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
