import { Cloneable } from "./abstract";
import { ICloneable, IModifiable } from "./interfaces";
import { IOutputPath, OutputPath } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";

export interface IOutputPathGroup<TOutputPath extends IOutputPath> extends ICloneable<IOutputPathGroup<TOutputPath>>, IModifiable<IOutputPathGroup<TOutputPath>> {
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

@JsonObject()
export class OutputPathGroup<TOutputPath extends IOutputPath> extends Cloneable<IOutputPathGroup<TOutputPath>> implements IOutputPathGroup<TOutputPath> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public Name: string;

    @JsonProperty()
    @JsonElementType(OutputPath)
    public Paths: TOutputPath[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Name = "";
        this.Paths = [];
    }


    /*
     *  Methods
     */
    public addOrUpdatePath(connection: TOutputPath): void {
        this.Paths.push(connection);
    }


    public removePath(connection: TOutputPath): void {

    }


    public clone(): IOutputPathGroup<TOutputPath> {
        const ret: OutputPathGroup<TOutputPath> = new OutputPathGroup<TOutputPath>();

        ret._id = this._id;
        ret.Name = this.Name;
        ret.Paths = this.Paths.map((conn: TOutputPath, i: number) => {
            return conn.clone() as TOutputPath
        });

        return ret;
    }


    public update(connection: IOutputPathGroup<TOutputPath>): void {
        this.Name = connection.Name;
        this.Paths = connection.Paths.map((conn: TOutputPath, i: number) => {
            return conn.clone() as TOutputPath
        });
    }
}