import { ConnectionGroup, DatabaseConnection, OutputPath, OutputPathGroup, Environment } from "./";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export default class ProjectSettings {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(Environment)
    public Environments: Environment[];

    @JsonProperty()
    public LocalPackageFolder: string;

    @JsonProperty()
    @JsonElementType(OutputPathGroup)
    public OutputPathGroups: OutputPathGroup<OutputPath>[];

    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    public DatabaseConnections: ConnectionGroup<DatabaseConnection>[];

    @JsonProperty()
    public RemotePackageLocation: string;


    /*
     *  Constructors
     */
    public constructor() {
        this.DatabaseConnections = [];
        this.LocalPackageFolder = '';
        this.OutputPathGroups = [];
        this.Environments = [
            new Environment({ IsActive: true, Name: 'Dev' }),
            new Environment({ Name: 'Prod' })
        ];
        this.RemotePackageLocation = '';
    }
}