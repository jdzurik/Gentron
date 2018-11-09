import { IEnvironment, DatabaseSource, Engine, Environment, FileSource, HttpSource } from ".";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";

export interface IPackageSettings {
    /*
     *  Properties & Fields 
     */
    DatabaseSources: DatabaseSource[];
    Engines: Engine[];
    Environments: IEnvironment[];
    FileSources: FileSource[];
    HttpSources: HttpSource[];
    PackageName: string;
    ReadMe: string;
}

@JsonObject()
export class PackageSettings implements IPackageSettings {
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
    public Environments: IEnvironment[];

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