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
    public OutputDirectories: OutputPath[];

    @JsonProperty()
    @JsonElementType(DatabaseConnection)
    public DatabaseConnectSettings: DatabaseConnection[];

    @JsonProperty()
    @JsonElementType(FileConnection)
    public InputSourceDirectories: FileConnection[];

    @JsonProperty()
    @JsonElementType(HttpConnection)
    public HttpConnectSettings: HttpConnection[];

    @JsonProperty()
    public RemotePackageLocation: HttpConnection;


    /*
     *  Constructors
     */
    public constructor() {
        this.LocalPackageFolder = '';
        this.DatabaseConnectSettings = new Array<DatabaseConnection>();
        this.InputSourceDirectories = new Array<FileConnection>();
        this.HttpConnectSettings = new Array<HttpConnection>();
        this.OutputDirectories = Array<OutputPath>();
        this.RemotePackageLocation = new HttpConnection();

    }
}