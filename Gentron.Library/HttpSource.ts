import { JsonObject } from "ta-json";
import SourceBase from "./SourceBase";
import Utilities from "./Utilities";

@JsonObject()
export default class HttpSource extends SourceBase<HttpSource> {
    /*
     *  Methods
     */
    public clone(): HttpSource {
        const ret: HttpSource = new HttpSource();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;

        return ret;
    }


    public update(httpSource: HttpSource): void {
        if (!Utilities.hasValue(httpSource)) {
            return;
        }

        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}