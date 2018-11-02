import { Cloneable } from "./abstract";
import { ICloneable, IJsonSerializable, IModifiable } from "./interfaces";
import { IOutputPath, OutputPath } from "./";
import { NonFunctionProperties } from "./types";

export interface IOutputPathGroup<TOutputPath extends IOutputPath> extends ICloneable<IOutputPathGroup<TOutputPath>>, IJsonSerializable<IOutputPathGroup<TOutputPath>>, IModifiable<IOutputPathGroup<TOutputPath>> {
    /*
     *  Properties & Fields 
     */
    Paths: TOutputPath[];
    Name: string;

    /*
     *  Methods
     */
    addOrUpdatePath(connection: TOutputPath): void;
    removePath(connection: TOutputPath): void;
}

export class OutputPathGroup<TOutputPath extends IOutputPath> extends Cloneable<IOutputPathGroup<TOutputPath>> implements IOutputPathGroup<TOutputPath> {
    /*
     *  Properties & Fields 
     */
    private _name: string;

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }


    private _paths: TOutputPath[];

    public get Paths(): TOutputPath[] {
        return (this._paths || []).slice();
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._name = "";
        this._paths = [];
    }


    /*
     *  Methods
     */
    public addOrUpdatePath(connection: TOutputPath): void {
        this._paths.push(connection);
    }

    public removePath(connection: TOutputPath): void {

    }

    public fromJson(json: NonFunctionProperties<IOutputPathGroup<TOutputPath>>): IOutputPathGroup<TOutputPath> {
        this._name = json.Name;
        this._paths = json.Paths.map((path: NonFunctionProperties<IOutputPath>, index: number) => new OutputPath().fromJson(path) as TOutputPath);

        return this;
    }

    public toJson(): NonFunctionProperties<IOutputPathGroup<TOutputPath>> {
        return {
            ID: this._id,
            Name: this._name,
            Paths: this._paths
        };
    }

    public clone(): IOutputPathGroup<TOutputPath> {
        const ret: OutputPathGroup<TOutputPath> = new OutputPathGroup<TOutputPath>();

        ret._cloneId = this.ID;
        ret._isClone = true;
        ret._name = this._name;
        ret._paths = this._paths.map((conn: TOutputPath, i: number) => conn.clone() as TOutputPath);

        return ret;
    }

    public update(connection: IOutputPathGroup<TOutputPath>): void {
        this._name = connection.Name;
        this._paths = connection.Paths.map((conn: TOutputPath, i: number) => conn.clone() as TOutputPath);
    }
}