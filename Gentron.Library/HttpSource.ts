import { ISourceBase, SourceBase } from "./SourceBase";
import { NonFunctionProperties } from "./types";

export interface IHttpSource extends ISourceBase {

}

export class HttpSource extends SourceBase implements IHttpSource {
    /*
     *  Methods
     */
    public toJson(): NonFunctionProperties<IHttpSource> {
        return {
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result
        };
    }

    public update(httpSource: IHttpSource): void {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}