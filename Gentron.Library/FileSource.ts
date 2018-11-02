﻿import { ISourceBase, SourceBase } from "./SourceBase";
import { NonFunctionProperties } from "./types";

export interface IFileSource extends ISourceBase { }

export class FileSource extends SourceBase implements IFileSource {
    /*
     *  Methods
     */
    public clone(): IFileSource {
        const ret: FileSource = new FileSource();

        ret._id = this._id;
        ret._isActive = this._isActive;
        ret._name = this._name;
        ret._result = this._result;

        return ret;
    }

    public fromJson(json: NonFunctionProperties<IFileSource>): IFileSource {
        this._id = json.ID;
        this._isActive = json.IsActive;
        this._name = json.Name;
        this._result = json.Result;

        return this;
    }

    public toJson(): NonFunctionProperties<IFileSource> {
        return {
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result
        };
    }

    public update(fileSource: IFileSource): void {
        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
    }
}