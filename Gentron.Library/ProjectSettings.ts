import { HttpConnection, FileConnection, DatabaseConnection, OutputPath, OutputPathGroup, Environment } from "./";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export default class ProjectSettings {
    /*
     *  Properties & Fields 
     */
    
    @JsonProperty()
    public LocalPackageFolder: string;

    @JsonProperty()
    @JsonElementType(Array)
    public OutputPaths: Array<OutputPath>;

    @JsonProperty()
    @JsonElementType(Array)
    public DatabaseConnections: Array<DatabaseConnection>;

    @JsonProperty()
    @JsonElementType(Array)
    public InputSourcePaths: Array<FileConnection>;

    @JsonProperty()
    @JsonElementType(Array)
    public HttpConnections: Array<HttpConnection>;

    @JsonProperty()
    @JsonElementType(HttpConnection)
    public RemotePackageLocation: HttpConnection;


    /*
     *  Constructors
     */
    public constructor() {
        this.LocalPackageFolder = '';
        this.DatabaseConnections = new Array<DatabaseConnection>();
        this.InputSourcePaths = new Array<FileConnection>();
        this.HttpConnections = new Array<HttpConnection>();
        this.OutputPaths = Array<OutputPath>();
        this.RemotePackageLocation = new HttpConnection();

    }
}