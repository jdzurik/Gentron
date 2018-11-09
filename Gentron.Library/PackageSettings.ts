import { DatabaseSource, Engine, Environment, FileSource, HttpSource } from ".";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export class PackageSettings {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(DatabaseSource)
    public DatabaseSources: DatabaseSource[];

    @JsonProperty()
    @JsonElementType(Engine)
    public Engines: Engine[];

    @JsonProperty()
    @JsonElementType(Environment)
    public Environments: Environment[];

    @JsonProperty()
    @JsonElementType(FileSource)
    public FileSources: FileSource[];

    @JsonProperty()
    @JsonElementType(HttpSource)
    public HttpSources: HttpSource[];

    @JsonProperty()
    public PackageName: string;

    @JsonProperty()
    public ReadMe: string;


    /*
     *  Constructors
     */
    public constructor() {
        this.DatabaseSources = [];
        this.Engines = [];
        this.Environments = [];
        this.FileSources = [];
        this.HttpSources = [];
        this.PackageName = "";
        this.ReadMe = "";
    }


    /*
     *  Methods
     */
}