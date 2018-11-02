import { ISourceBase, SourceBase } from "./SourceBase";
import { ITemplate } from "./Template";
import { NonFunctionProperties } from "./types";

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
    private _templates: ITemplate[];

    public get Templates(): ITemplate[] {
        return this._templates;
    }

    public set Templates(value: ITemplate[]) {
        this._templates = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._templates = [];
    }


    /*
     *  Methods
     */
    public toJson(): NonFunctionProperties<IEngine> {
        return {
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result,
            Templates: this._templates.map((template: ITemplate, index: number) => template.toJson() as ITemplate)
        };
    }

    public update(engine: IEngine): void {
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}