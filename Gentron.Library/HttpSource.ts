import { ISourceBase, SourceBase } from "./SourceBase";

export interface IHttpSource extends ISourceBase {

}

export class HttpSource extends SourceBase implements IHttpSource {
    /*
     *  Methods
     */
    public update(httpSource: IHttpSource): void {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}