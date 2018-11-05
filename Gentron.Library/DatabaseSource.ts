﻿import { ConnectionGroup, IConnectionGroup, IDatabaseConnection, File, IFile, Utilities } from ".";
import { ISourceBase, SourceBase } from "./SourceBase";
import { NonFunctionProperties } from "./types";
import { DatabaseConnection } from "./DatabaseConnection";

export interface IDatabaseSource extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    ActiveConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    Script?: IFile;
}

export class DatabaseSource extends SourceBase implements IDatabaseSource {
    /*
     *  Properties & Fields 
     */
    private _activeConnectionGroup: IConnectionGroup<IDatabaseConnection>;

    public get ActiveConnectionGroup(): IConnectionGroup<IDatabaseConnection> {
        return this._activeConnectionGroup;
    }

    public set ActiveConnectionGroup(value: IConnectionGroup<IDatabaseConnection>) {
        this._activeConnectionGroup = value;
    }


    private _script: IFile;

    public get Script(): IFile {
        return this._script;
    }

    public set Script(value: IFile) {
        this._script = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._activeConnectionGroup = new ConnectionGroup<IDatabaseConnection>(() => new DatabaseConnection());
        this._script = new File();
    }


    /*
     *  Methods
     */
    public clone(): IDatabaseSource {
        const ret: DatabaseSource = new DatabaseSource();

        ret._activeConnectionGroup = this._activeConnectionGroup.clone();
        ret._id = this._id;
        ret._isActive = this._isActive;
        ret._name = this._name;
        ret._result = this._result;
        ret._script = this._script;

        return ret;
    }

    public fromJson(json: NonFunctionProperties<IDatabaseSource>): IDatabaseSource {
        this._activeConnectionGroup = this._activeConnectionGroup.fromJson(json.ActiveConnectionGroup);
        this._isActive = json.IsActive;
        this._name = json.Name;
        this._result = json.Result;
        this._script = this._script.fromJson(json.Script as NonFunctionProperties<IFile>);

        return this;
    }

    public toJson(): NonFunctionProperties<IDatabaseSource> {
        return {
            ActiveConnectionGroup: this._activeConnectionGroup.toJson() as IConnectionGroup<IDatabaseConnection>,
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result,
            Script: this._script.toJson() as IFile
        };
    }


    public update(databaseSource: IDatabaseSource): void {
        if (typeof (databaseSource) === typeof (undefined) || databaseSource === null) {
            return;
        }

        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;

        this.Script.update(databaseSource.Script as IFile);
        //if (Utilities.hasValue(this.Script)
        //    && Utilities.hasValue(databaseSource.Script)
        //    && this.Script.Path !== databaseSource.Script.Path) {
        //}
    }
}