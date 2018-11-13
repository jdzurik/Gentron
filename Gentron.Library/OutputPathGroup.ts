import { Cloneable } from "./abstract";
import { IModifiable } from "./interfaces";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { OutputPath, Utilities } from "./";

@JsonObject()
export default class OutputPathGroup<TOutputPath extends OutputPath> extends Cloneable<OutputPathGroup<TOutputPath>> implements IModifiable<OutputPathGroup<TOutputPath>> {
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
    public addOrUpdatePath(path: TOutputPath): void {
        this.Paths.push(path);
    }


    public removePath(path: TOutputPath): void {

    }


    public clone(): OutputPathGroup<TOutputPath> {
        const ret: OutputPathGroup<TOutputPath> = new OutputPathGroup<TOutputPath>();

        ret._id = this._id;
        ret.Name = this.Name;
        ret.Paths = this.Paths.map((conn: TOutputPath, i: number) => {
            return conn.clone() as TOutputPath
        });

        return ret;
    }


    public update(connection: OutputPathGroup<TOutputPath>): void {
        if (!Utilities.hasValue(connection)) {
            return;
        }

        this.Name = connection.Name;
        this.Paths = connection.Paths.map((conn: TOutputPath, i: number) => {
            return conn.clone() as TOutputPath
        });
    }
}