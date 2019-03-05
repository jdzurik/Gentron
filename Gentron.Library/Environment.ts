import { ConnectionGroup, DatabaseConnection, OutputPath, OutputPathGroup } from "./";
import { Cloneable } from "./abstract";
import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import { Nullable, NonFunctionProperties } from "./types";
import { stringify } from "querystring";

@JsonObject()
export default class Environment extends Cloneable<Environment> implements IActivateable, ICloneable<Environment>, IModifiable<Environment> {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public IsActive: boolean;

    @JsonProperty()
    public Name: string;

    @JsonProperty()
    @JsonElementType(OutputPathGroup)
    public OutputPathGroups: OutputPathGroup<OutputPath>[];

    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    public DatabaseConnections: ConnectionGroup<DatabaseConnection>[];

    /*
     *  Constructors
     */
    public constructor();
    public constructor(props: Nullable<NonFunctionProperties<Environment>>);
    public constructor(props: Nullable<NonFunctionProperties<Environment>> = { IsActive: false, Name: '' }) {
        super();
       (props.IsActive)?this.IsActive = true:this.IsActive = false;
       this.Name = String(props.Name);
       this.DatabaseConnections = [];
       this.OutputPathGroups = [];

    }


    /*
     *  Methods
     */
    public clone(): Environment {
        const ret: Environment = new Environment();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.OutputPathGroups = this.OutputPathGroups;
        ret.DatabaseConnections = this.DatabaseConnections;

        return ret;
    }

    public update(environment: Environment): void {
        if (!ObjectUtils.hasValue(environment)) {
            return;
        }

        this.IsActive = environment.IsActive;
        this.Name = environment.Name;
    }
}