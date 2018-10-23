import { IConnectionGroup } from "./ConnectionGroup";
import { IDatabaseConnection } from "./DatabaseConnection";
import { IFileConnection } from "./FileConnection";
import { IHttpConnection } from "./HttpConnection";
import IJsonSerializable from "./interfaces/IJsonSerializable";

export interface IProjectSettings extends IJsonSerializable {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];
    FileConnections: IConnectionGroup<IFileConnection>[];
    HttpConnections: IConnectionGroup<IHttpConnection>[];
    LocalPackageFolder: string;
    OutputCodeFolder: string;
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


    private _outputCodeFolder: string;

    public get OutputCodeFolder(): string {
        return this._outputCodeFolder;
    }

    public set OutputCodeFolder(value: string) {
        this._outputCodeFolder = value;
    }


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
        //this._databaseConnections = [];
        this.DatabaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this._outputCodeFolder = "";
        this._remotePackageLocation = "";
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IProjectSettings {
        const ret: IProjectSettings = new ProjectSettings();

        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputCodeFolder = obj.OutputCodeFolder;
        ret.RemotePackageLocation = obj.RemotePackageLocation;

        return ret;
    }

    public toJson(): any {
        return {
            DatabaseConnections: this.DatabaseConnections,
            FileConnections: this.FileConnections,
            HttpConnections: this.HttpConnections,
            LocalPackageFolder: this.LocalPackageFolder,
            OutputCodeFolder: this.OutputCodeFolder,
            RemotePackageLocation: this.RemotePackageLocation,
        };
    }

    public static toJson(obj: IProjectSettings): any {
        return {
            DatabaseConnections: obj.DatabaseConnections,
            FileConnections: obj.FileConnections,
            HttpConnections: obj.HttpConnections,
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputCodeFolder: obj.OutputCodeFolder,
            RemotePackageLocation: obj.RemotePackageLocation,
        };
    }
}