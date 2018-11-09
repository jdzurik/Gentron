import { ConnectionGroup, DatabaseConnection, IOutputPath, IOutputPathGroup, OutputPathGroup } from "./";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";

export interface IProjectSettings {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: ConnectionGroup<DatabaseConnection>[];
    LocalPackageFolder: string;
    OutputPathGroups: IOutputPathGroup<IOutputPath>[];
    RemotePackageLocation: string;
}

@JsonObject()
export class ProjectSettings implements IProjectSettings {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    public DatabaseConnections: ConnectionGroup<DatabaseConnection>[];

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
        this.DatabaseConnections = [];
        this.LocalPackageFolder = "";
        this.OutputPathGroups = [];
        this.RemotePackageLocation = "";
    }


    /*
     *  Methods
     */
}