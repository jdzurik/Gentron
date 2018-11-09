import { SourceBase } from "./SourceBase";
import { JsonObject } from "ta-json";
import Utilities from "./Utilities";

@JsonObject()
export class FileSource extends SourceBase<FileSource> {
    /*
     *  Methods
     */
    public clone(): FileSource {
        const ret: FileSource = new FileSource();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;

        return ret;
    }


    public update(fileSource: FileSource): void {
        if (!Utilities.hasValue(fileSource)) {
            return;
        }

        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
    }
}