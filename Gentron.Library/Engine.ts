import { ISourceBase, SourceBase } from "./SourceBase";

export interface IEngine extends ISourceBase {

}

export class Engine extends SourceBase implements IEngine {
    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public update(httpSource: IEngine): void {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}