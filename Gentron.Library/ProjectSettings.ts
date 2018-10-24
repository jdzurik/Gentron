import { IConnectionGroup } from "./ConnectionGroup";
import { IDatabaseConnection } from "./DatabaseConnection";
import { IFileConnection } from "./FileConnection";
import { IHttpConnection } from "./HttpConnection";
import { IOutputPath } from "./OutputPath";
import IJsonSerializable from "./interfaces/IJsonSerializable";

export interface IProjectSettings extends IJsonSerializable {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];
    FileConnections: IConnectionGroup<IFileConnection>[];
    HttpConnections: IConnectionGroup<IHttpConnection>[];
    LocalPackageFolder: string;
    OutputPaths: IOutputPath[];
    RemotePackageLocation: string;
}

export class ProjectSettings implements IProjectSettings {
    /*
     *  Properties & Fields 
     */
    //private _databaseConnections: IConnectionGroup<IDatabaseConnection>[];

    //public get DatabaseConnections(): IConnectionGroup<IDatabaseConnection>[] {
    //    return this._databaseConnections;
    //}

    //public set DatabaseConnections(value: IConnectionGroup<IDatabaseConnection>[]) {
    //    this._databaseConnections = value;
    //}

    public DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];


    private _fileConnections: IConnectionGroup<IFileConnection>[];

    public get FileConnections(): IConnectionGroup<IFileConnection>[] {
        return this._fileConnections;
    }

    public set FileConnections(value: IConnectionGroup<IFileConnection>[]) {
        this._fileConnections = value;
    }


    private _httpConnections: IConnectionGroup<IHttpConnection>[];

    public get HttpConnections(): IConnectionGroup<IHttpConnection>[] {
        return this._httpConnections;
    }

    public set HttpConnections(value: IConnectionGroup<IHttpConnection>[]) {
        this._httpConnections = value;
    }


    private _localPackageFolder: string;

    public get LocalPackageFolder(): string {
        return this._localPackageFolder;
    }

    public set LocalPackageFolder(value: string) {
        this._localPackageFolder = value;
    }


    //private _outputPaths: IOutputPath[];

    //public get OutputPaths(): IOutputPath[] {
    //    return this._outputPaths;
    //}

    //public set OutputPaths(value: IOutputPath[]) {
    //    this._outputPaths = value;
    //}

    public OutputPaths: IOutputPath[];


    private _remotePackageLocation: string;

    public get RemotePackageLocation(): string {
        return this._remotePackageLocation;
    }

    public set RemotePackageLocation(value: string) {
        this._remotePackageLocation = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this.DatabaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this.OutputPaths = [];
        this._remotePackageLocation = "";
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IProjectSettings {
        const ret: IProjectSettings = new ProjectSettings();

        ret.DatabaseConnections = obj.DatabaseConnections;
        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputPaths = obj.OutputPaths;
        ret.RemotePackageLocation = obj.RemotePackageLocation;

        return ret;
    }

    public toJson(): any {
        return {
            DatabaseConnections: this.DatabaseConnections,
            FileConnections: this.FileConnections,
            HttpConnections: this.HttpConnections,
            LocalPackageFolder: this.LocalPackageFolder,
            OutputPaths: this.OutputPaths,
            RemotePackageLocation: this.RemotePackageLocation,
        };
    }

    public static toJson(obj: IProjectSettings): any {
        return {
            DatabaseConnections: obj.DatabaseConnections,
            FileConnections: obj.FileConnections,
            HttpConnections: obj.HttpConnections,
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputPaths: obj.OutputPaths,
            RemotePackageLocation: obj.RemotePackageLocation,
        };
    }
}