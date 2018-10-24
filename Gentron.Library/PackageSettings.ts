import { IDatabaseSource, IFileSource, IHttpSource } from ".";
import IJsonSerializable from "./interfaces/IJsonSerializable";

export interface IPackageSettings extends IJsonSerializable {
    /*
     *  Properties & Fields 
     */
    DatabaseSources: IDatabaseSource[];
    FileSources: IFileSource[];
    HttpSources: IHttpSource[];
    PackageName: string;
    ReadMeText: string;
}

export class PackageSettings implements IPackageSettings {
    /*
     *  Properties & Fields 
     */
    //private _databaseSources: IDatabaseSource[];

    //public get DatabaseSources(): IDatabaseSource[] {
    //    return this._databaseSources;
    //}

    //public set DatabaseSources(value: IDatabaseSource[]) {
    //    this._databaseSources = value;
    //}

    public DatabaseSources: IDatabaseSource[];

    //private _fileSources: IFileSource[];

    //public get FileSources(): IFileSource[] {
    //    return this._fileSources;
    //}

    //public set FileSources(value: IFileSource[]) {
    //    this._fileSources = value;
    //}

    public FileSources: IFileSource[];

    //private _httpSources: IHttpSource[];

    //public get HttpSources(): IHttpSource[] {
    //    return this._httpSources;
    //}

    //public set HttpSources(value: IHttpSource[]) {
    //    this._httpSources = value;
    //}

    public HttpSources: IHttpSource[];

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
        this.DatabaseSources = [];
        this.FileSources = [];
        this.HttpSources = [];
        this._packageName = "";
        this._readMeText = "";
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IPackageSettings {
        const ret: IPackageSettings = new PackageSettings();

        ret.DatabaseSources = obj.DatabaseSources;
        ret.FileSources = obj.FileSources;
        ret.HttpSources = obj.HttpSources;
        ret.PackageName = obj.PackageName;
        ret.ReadMeText = obj.ReadMeText;

        return ret;
    }

    public toJson(): any {
        return {
            DatabaseSources: this.DatabaseSources,
            FileSources: this.FileSources,
            HttpSources: this.HttpSources,
            PackageName: this.PackageName,
            ReadMeText: this.ReadMeText
        };
    }

    public static toJson(obj: IPackageSettings): any {
        return {
            DatabaseSources: obj.DatabaseSources,
            FileSources: obj.FileSources,
            HttpSources: obj.HttpSources,
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    }
}