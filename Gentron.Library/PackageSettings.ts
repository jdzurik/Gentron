﻿import { DatabaseSource, Engine, Environment, FileSource, HttpSource, IDatabaseSource, IEngine, IEnvironment, IFileSource, IHttpSource } from ".";
import { IJsonSerializable } from "./interfaces";
import { NonFunctionProperties } from "./types";

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

export class PackageSettings implements IPackageSettings {
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
    public fromJson(json: NonFunctionProperties<IPackageSettings>): IPackageSettings {
        this._databaseSources = json.DatabaseSources.map((source: NonFunctionProperties<IDatabaseSource>, index: number) => new DatabaseSource().fromJson(source));
        this._engines = json.Engines.map((source: NonFunctionProperties<IEngine>, index: number) => new Engine().fromJson(source));
        this._environments = json.Environments.map((source: NonFunctionProperties<IEnvironment>, index: number) => new Environment().fromJson(source));
        this._fileSources = json.FileSources.map((source: NonFunctionProperties<IFileSource>, index: number) => new FileSource().fromJson(source));
        this._httpSources = json.HttpSources.map((source: NonFunctionProperties<IHttpSource>, index: number) => new HttpSource().fromJson(source));
        this._packageName = json.PackageName;
        this._readMeText = json.ReadMeText;

        return this;
    }

    public toJson(): NonFunctionProperties<IPackageSettings> {
        return {
            DatabaseSources: this._databaseSources.map((source: IDatabaseSource, index: number) => source.toJson() as IDatabaseSource),
            Engines: this._engines.map((source: IEngine, index: number) => source.toJson() as IEngine),
            Environments: this._environments.map((source: IEnvironment, index: number) => source.toJson() as IEnvironment),
            FileSources: this._fileSources.map((source: IFileSource, index: number) => source.toJson() as IFileSource),
            HttpSources: this._httpSources.map((source: IHttpSource, index: number) => source.toJson() as IHttpSource),
            PackageName: this._packageName,
            ReadMeText: this._readMeText
        };
    }
}