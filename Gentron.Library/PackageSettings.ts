import { IDatabaseSource, IEngine, IEnvironment, IFileSource, IHttpSource, DatabaseSource, Engine, Environment, FileSource, HttpSource } from ".";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { Cloneable } from "./abstract";
import { ICloneable } from "./interfaces";

export interface IPackageSettings extends ICloneable<IPackageSettings> {
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
export class PackageSettings extends Cloneable<IPackageSettings> implements IPackageSettings {
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
        super();
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
    public clone(): IPackageSettings {
        throw new Error("Method not implemented");
    }
}