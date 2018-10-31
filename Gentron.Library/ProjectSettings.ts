import { IConnectionGroup, IDatabaseConnection, IFileConnection, IHttpConnection, IOutputPath, IOutputPathGroup } from "./";
import { IJsonSerializable } from "./interfaces";
import { JsonSerializable } from "./abstract";

export interface IProjectSettings extends IJsonSerializable<IProjectSettings> {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];
    FileConnections: IConnectionGroup<IFileConnection>[];
    HttpConnections: IConnectionGroup<IHttpConnection>[];
    LocalPackageFolder: string;
    OutputPathGroups: IOutputPathGroup<IOutputPath>[];
    RemotePackageLocation: string;
}

export class ProjectSettings extends JsonSerializable<IProjectSettings> implements IProjectSettings {
    /*
     *  Properties & Fields 
     */
    private _databaseConnections: IConnectionGroup<IDatabaseConnection>[];

    public get DatabaseConnections(): IConnectionGroup<IDatabaseConnection>[] {
        return this._databaseConnections;
    }

    public set DatabaseConnections(value: IConnectionGroup<IDatabaseConnection>[]) {
        this._databaseConnections = value;
    }


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


    private _outputPathGroups: IOutputPathGroup<IOutputPath>[];

    public get OutputPathGroups(): IOutputPathGroup<IOutputPath>[] {
        return this._outputPathGroups;
    }

    public set OutputPathGroups(value: IOutputPathGroup<IOutputPath>[]) {
        this._outputPathGroups = value;
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
        super();
        this._databaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this._outputPathGroups = [];
        this._remotePackageLocation = "";
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IProjectSettings {
        const ret: IProjectSettings = new ProjectSettings();

        ret.DatabaseConnections = obj.DatabaseConnections;
        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputPathGroups = obj.OutputPathGroups;
        ret.RemotePackageLocation = obj.RemotePackageLocation;

        return ret;
    }

    public toJson(): any {
        return {
            DatabaseConnections: this.DatabaseConnections,
            FileConnections: this.FileConnections,
            HttpConnections: this.HttpConnections,
            LocalPackageFolder: this.LocalPackageFolder,
            OutputPathGroups: this.OutputPathGroups,
            RemotePackageLocation: this.RemotePackageLocation,
        };
    }

    public static toJson(obj: IProjectSettings): any {
        return {
            DatabaseConnections: obj.DatabaseConnections,
            FileConnections: obj.FileConnections,
            HttpConnections: obj.HttpConnections,
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputPathGroups: obj.OutputPathGroups,
            RemotePackageLocation: obj.RemotePackageLocation,
        };
    }
}