import { ISourceBase, SourceBase } from "./SourceBase";
import { ITemplate } from "./Template";

export interface IEngine extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    Templates: ITemplate[];
}

export class Engine extends SourceBase implements IEngine {
    /*
     *  Properties & Fields 
     */
    //private _templates: ITemplate[];

    //public get Templates(): ITemplate[] {
    //    return this._templates;
    //}

    //public set Templates(value: ITemplate[]) {
    //    this._templates = value;
    //}

    public Templates: ITemplate[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Templates = [];
    }


    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public update(engine: IEngine): void {
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}