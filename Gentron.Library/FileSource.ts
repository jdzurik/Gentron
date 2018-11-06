import { ISourceBase, SourceBase } from "./SourceBase";
import { JsonObject } from "ta-json";

export interface IFileSource extends ISourceBase { }

@JsonObject()
export class FileSource extends SourceBase implements IFileSource {
    /*
     *  Methods
     */
    public clone(): IFileSource {
        const ret: FileSource = new FileSource();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;

        return ret;
    }


    public update(fileSource: IFileSource): void {
        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
    }
}