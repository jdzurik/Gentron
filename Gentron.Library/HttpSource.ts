import { ISourceBase, SourceBase } from "./SourceBase";
import { NonFunctionProperties } from "./types";

export interface IHttpSource extends ISourceBase {

}

export class HttpSource extends SourceBase implements IHttpSource {
    /*
     *  Methods
     */
    public fromJson(json: NonFunctionProperties<IHttpSource>): IHttpSource {
        this._id = json.ID;
        this._isActive = json.IsActive;
        this._name = json.Name;
        this._result = json.Result;

        return this;
    }

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