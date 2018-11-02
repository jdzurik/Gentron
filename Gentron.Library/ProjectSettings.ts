import { IConnectionGroup, IDatabaseConnection, IFileConnection, IHttpConnection, IOutputPath, IOutputPathGroup, ConnectionGroup } from "./";
import { IJsonSerializable } from "./interfaces";
import { NonFunctionProperties } from "./types";
import { DatabaseConnection } from "./DatabaseConnection";
import { OutputPathGroup } from "./OutputPathGroup";

export interface IProjectSettings extends IJsonSerializable<IProjectSettings> {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];
    LocalPackageFolder: string;
    OutputPathGroups: IOutputPathGroup<IOutputPath>[];
    RemotePackageLocation: string;
}

export class ProjectSettings implements IProjectSettings {
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
        this._databaseConnections = [];
        this._localPackageFolder = "";
        this._outputPathGroups = [];
        this._remotePackageLocation = "";
    }


    /*
     *  Methods
     */
    public fromJson(json: NonFunctionProperties<IProjectSettings>): IProjectSettings {
        this._databaseConnections = json.DatabaseConnections.map((group: NonFunctionProperties<IConnectionGroup<IDatabaseConnection>>, index: number) => new ConnectionGroup<IDatabaseConnection>().fromJson(group));
        this._localPackageFolder = json.LocalPackageFolder;
        this._outputPathGroups = json.OutputPathGroups.map((group: NonFunctionProperties<IOutputPathGroup<IOutputPath>>, index: number) => new OutputPathGroup<IOutputPath>().fromJson(group));
        this._remotePackageLocation = json.RemotePackageLocation;

        return this;
    }

    public toJson(): NonFunctionProperties<IProjectSettings> {
        return {
            DatabaseConnections: this._databaseConnections.map((connection: IConnectionGroup<IDatabaseConnection>, index: number) => connection.toJson() as IConnectionGroup<IDatabaseConnection>),
            LocalPackageFolder: this._localPackageFolder,
            OutputPathGroups: this._outputPathGroups.map((connection: IOutputPathGroup<IOutputPath>, index: number) => connection.toJson() as IOutputPathGroup<IOutputPath>),
            RemotePackageLocation: this._remotePackageLocation
        };
    }
}