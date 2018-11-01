import { ISourceBase, SourceBase } from "./SourceBase";

export interface IFileSource extends ISourceBase {

}

export class FileSource extends SourceBase implements IFileSource {
    /*
     *  Methods
     */
    public update(fileSource: IFileSource): void {
        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
    }
}