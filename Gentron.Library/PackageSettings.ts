import { IDatabaseSource, IEngine, IEnvironment, IFileSource, IHttpSource, DatabaseSource, Engine, Environment, FileSource, HttpSource } from ".";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";

export interface IPackageSettings {
    /*
     *  Properties & Fields 
     */
    DatabaseSources: IDatabaseSource[];
    Engines: IEngine[];
    Environments: IEnvironment[];
    FileSources: IFileSource[];
    HttpSources: IHttpSource[];
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
    public DatabaseSources: IDatabaseSource[];

    @JsonProperty()
    @JsonElementType(Engine)
    public Engines: IEngine[];

    @JsonProperty()
    @JsonElementType(Environment)
    public Environments: IEnvironment[];

    @JsonProperty()
    @JsonElementType(FileSource)
    public FileSources: IFileSource[];

    @JsonProperty()
    @JsonElementType(HttpSource)
    public HttpSources: IHttpSource[];

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