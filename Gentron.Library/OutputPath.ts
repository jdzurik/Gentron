import { ICloneable, IJsonSerializable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";
import { NonFunctionProperties } from "./types";

export interface IOutputPath extends ICloneable<IOutputPath>, IJsonSerializable<IOutputPath>, IModifiable<IOutputPath> {
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
    public fromJson(json: NonFunctionProperties<IOutputPath>): IOutputPath {
        this._environment = json.Environment;
        this._id = json.ID;
        this._path = json.Path;

        return this;
    }

    public toJson(): NonFunctionProperties<IOutputPath> {
        return {
            Environment: this._environment,
            ID: this._id,
            Path: this._path
        };
    }

    public clone(): IOutputPath {
        const ret: OutputPath = new OutputPath();

        ret._environment = this._environment;
        ret._id = this._id;
        ret._path = this._path;

        return ret;
    }

    public update(ouputPath: IOutputPath): void {
        this._environment = ouputPath.Environment;
        this._path = ouputPath.Path;
    }
}