import { IDatabaseSource, IEngine, IFileSource, IHttpSource, IEnvironment } from ".";
import { IJsonSerializable } from "./interfaces";
import { JsonSerializable } from "./abstract";

export interface IPackageSettings extends IJsonSerializable<IPackageSettings> {
    /*
     *  Properties & Fields 
     */
    DatabaseSources: IDatabaseSource[];
    Engines: IEngine[];
    Environments: IEnvironment[];
    FileSources: IFileSource[];
    HttpSources: IHttpSource[];
    PackageName: string;
    ReadMeText: string;
}

export class PackageSettings extends JsonSerializable<IPackageSettings> implements IPackageSettings {
    /*
     *  Properties & Fields 
     */
    private _databaseSources: IDatabaseSource[];

    public get DatabaseSources(): IDatabaseSource[] {
        return this._databaseSources;
    }

    public set DatabaseSources(value: IDatabaseSource[]) {
        this._databaseSources = value;
    }


    private _engines: IEngine[];

    public get Engines(): IEngine[] {
        return this._engines;
    }

    public set Engines(value: IEngine[]) {
        this._engines= value;
    }


    private _environments: IEnvironment[];

    public get Environments(): IEnvironment[] {
        return this._environments;
    }

    public set Environments(value: IEnvironment[]) {
        this._environments= value;
    }


    private _fileSources: IFileSource[];

    public get FileSources(): IFileSource[] {
        return this._fileSources;
    }

    public set FileSources(value: IFileSource[]) {
        this._fileSources = value;
    }


    private _httpSources: IHttpSource[];

    public get HttpSources(): IHttpSource[] {
        return this._httpSources;
    }

    public set HttpSources(value: IHttpSource[]) {
        this._httpSources = value;
    }


    private _packageName: string;

    public get PackageName(): string {
        return this._packageName;
    }

    public set PackageName(value: string) {
        this._packageName = value;
    }


    private _readMeText: string;

    public get ReadMeText(): string {
        return this._readMeText;
    }

    public set ReadMeText(value: string) {
        this._readMeText = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._databaseSources = [];
        this._engines = [];
        this._environments = [];
        this._fileSources = [];
        this._httpSources = [];
        this._packageName = "";
        this._readMeText = "";
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IPackageSettings {
        const ret: IPackageSettings = new PackageSettings();

        ret.DatabaseSources = obj.DatabaseSources;
        ret.Engines = obj.Engines;
        ret.Environments = obj.Environments;
        ret.FileSources = obj.FileSources;
        ret.HttpSources = obj.HttpSources;
        ret.PackageName = obj.PackageName;
        ret.ReadMeText = obj.ReadMeText;

        return ret;
    }

    public toJson(): any {
        return {
            DatabaseSources: this.DatabaseSources,
            Engines: this.Engines,
            Environments: this.Environments,
            FileSources: this.FileSources,
            HttpSources: this.HttpSources,
            PackageName: this.PackageName,
            ReadMeText: this.ReadMeText
        };
    }

    public static toJson(obj: IPackageSettings): any {
        return {
            DatabaseSources: obj.DatabaseSources,
            Engines: obj.Engines,
            Environments: obj.Environments,
            FileSources: obj.FileSources,
            HttpSources: obj.HttpSources,
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    }
}