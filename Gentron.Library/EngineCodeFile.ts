import { JsonObject, JsonProperty } from "ta-json";
import { File, VMUtils, ObjectUtils } from "./";
import { ModulePackage, ModuleList } from "./types";



@JsonObject()
export default class EngineCodeFile extends File {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public IncludeConsole: boolean;

    @JsonProperty()
    public IncludeDirname: boolean;

    @JsonProperty()
    public IncludeFilename: boolean;

    @JsonProperty()
    public IncludeRequires: boolean;

    public ModifiedContents: string;

    @JsonProperty()
    public PackageList: ModulePackage[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.IncludeConsole = false;
        this.IncludeDirname = false;
        this.IncludeFilename = false;
        this.IncludeRequires = false;
        this.ModifiedContents = '';
        this.PackageList = [];
    }


    /*
     *  Methods
     */
    public clone(): EngineCodeFile {
        const ret: EngineCodeFile = new EngineCodeFile();

        ret._id = this._id;
        ret.Contents = this.Contents;
        ret.LastModified = this.LastModified;
        ret.Path = this.Path;

        ret.IncludeConsole = this.IncludeConsole;
        ret.IncludeDirname = this.IncludeDirname;
        ret.IncludeFilename = this.IncludeFilename;
        ret.IncludeRequires = this.IncludeRequires;
        ret.PackageList = this.PackageList.map((module: ModulePackage, index: number, arr: ModulePackage[]) => {
            return { ...module };
        });

        return ret;
    }


    public resolveModulesRelativePaths(dirname: string, localPackageFolder: string): void {
        if (!ObjectUtils.hasValue(this.PackageList) || !ObjectUtils.isArray(this.PackageList) || this.PackageList.length === 0) {
            return;
        }

        for (let i: number = 0; i < this.PackageList.length; ++i) {
            VMUtils.resolveModuleRelativePath(dirname, localPackageFolder, this.PackageList[i]);
            this.ModifiedContents = VMUtils.rewriteModuleRequires(this.PackageList, this.Contents);
        }
    }


    public toModuleListOptions(): ModuleList {
        return {
            IncludeConsole: this.IncludeConsole,
            IncludeDirname: this.IncludeDirname,
            IncludeFilename: this.IncludeFilename,
            IncludeRequires: this.IncludeRequires,
            PackageList: this.PackageList
        };
    }


    public update(codeEngineFile: EngineCodeFile): void {
        super.update(codeEngineFile);

        const moduleList: ModuleList = VMUtils.getDependenciesFromModuleSource(this.Contents);

        this.IncludeConsole = moduleList.IncludeConsole;
        this.IncludeDirname = moduleList.IncludeDirname;
        this.IncludeFilename = moduleList.IncludeFilename;
        this.IncludeRequires = moduleList.IncludeRequires;
        this.PackageList = moduleList.PackageList;
    }
}