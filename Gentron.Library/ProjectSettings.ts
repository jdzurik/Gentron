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
    @JsonElementType(OutputPath)
    public OutputPaths: OutputPath[];

    @JsonProperty()
    @JsonElementType(DatabaseConnection)
    public DatabaseConnections: DatabaseConnection[];

    @JsonProperty()
    @JsonElementType(FileConnection)
    public InputSourcePaths: FileConnection[];

    @JsonProperty()
    @JsonElementType(HttpConnection)
    public HttpConnections: HttpConnection[];

    @JsonProperty()
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