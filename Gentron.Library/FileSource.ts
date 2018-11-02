import { ISourceBase, SourceBase } from "./SourceBase";
import { NonFunctionProperties } from "./types";

export interface IFileSource extends ISourceBase { }

export class FileSource extends SourceBase implements IFileSource {
    /*
     *  Methods
     */
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