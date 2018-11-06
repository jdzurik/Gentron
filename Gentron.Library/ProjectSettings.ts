import { ConnectionGroup, IConnectionGroup, IDatabaseConnection, IOutputPath, IOutputPathGroup, OutputPathGroup } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { Cloneable } from "./abstract";
import { ICloneable } from "./interfaces";

export interface IProjectSettings extends ICloneable<IProjectSettings> {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];
    LocalPackageFolder: string;
    OutputPathGroups: IOutputPathGroup<IOutputPath>[];
    RemotePackageLocation: string;
}

@JsonObject()
export class ProjectSettings extends Cloneable<IProjectSettings> implements IProjectSettings {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    public DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];

    @JsonProperty()
    public LocalPackageFolder: string;

    @JsonProperty()
    @JsonElementType(OutputPathGroup)
    public OutputPathGroups: IOutputPathGroup<IOutputPath>[];

    @JsonProperty()
    public RemotePackageLocation: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.DatabaseConnections = [];
        this.LocalPackageFolder = "";
        this.OutputPathGroups = [];
        this.RemotePackageLocation = "";
    }


    /*
     *  Methods
     */
    public clone(): IProjectSettings {
        throw new Error("Method not implemented");
    }
}