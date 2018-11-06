import { ISourceBase, SourceBase } from "./SourceBase";
import { JsonObject } from "ta-json";

export interface IHttpSource extends ISourceBase { }

@JsonObject()
export class HttpSource extends SourceBase implements IHttpSource {
    /*
     *  Methods
     */
    public clone(): IHttpSource {
        const ret: HttpSource = new HttpSource();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;

        return ret;
    }


    public update(httpSource: IHttpSource): void {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}