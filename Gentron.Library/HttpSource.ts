import { ISourceBase, SourceBase } from "./SourceBase";
import { JsonObject } from "ta-json";
import Utilities from "./Utilities";

export interface IHttpSource extends ISourceBase<IHttpSource> { }

@JsonObject()
export class HttpSource extends SourceBase<IHttpSource> implements IHttpSource {
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
        if (!Utilities.hasValue(httpSource)) {
            return;
        }

        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}