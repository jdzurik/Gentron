import { ICloneable, IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";

export interface IOutputPath extends ICloneable<IOutputPath>, IJsonSerializable<IOutputPath>, IIdentifiable, IModifiable<IOutputPath> {
    /*
     *  Properties & Fields
     */
    Environment: string;
    Path: string;
}

export class OutputPath extends Cloneable<IOutputPath> implements IOutputPath {
    /*
     *  Properties & Fields
     */
    private _environment: string;

    public get Environment(): string {
        return this._environment;
    }

    public set Environment(value: string) {
        this._environment = value;
    }


    private _path: string;

    public get Path(): string {
        return this._path;
    }

    public set Path(value: string) {
        this._path = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._environment = "";
        this._path = "";
    }


    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public clone(): IOutputPath {
        const ret: OutputPath = new OutputPath();

        ret._cloneId = this._id;
        ret._isClone = true;
        ret._environment = this._environment;
        ret._path = this._path;

        return ret;
    }

    public update(ouputPath: IOutputPath): void {
        this._environment = ouputPath.Environment;
        this._path = ouputPath.Path;
    }
}