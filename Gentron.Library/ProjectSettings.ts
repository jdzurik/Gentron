import { ConnectionGroup, DatabaseConnection, OutputPath, OutputPathGroup } from "./";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export class ProjectSettings {
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
    public OutputPathGroups: OutputPathGroup<OutputPath>[];

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