import SourceBase from './SourceBase';
import { JsonObject } from 'ta-json';
import { ObjectUtils } from './';

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
        if (!ObjectUtils.hasValue(httpSource)) {
            return;
        }

        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}