import { DatabaseSource, Engine, Environment, FileSource, HttpSource, Utilities } from "./";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";
import { TDataSourceResult } from "./results";
import SourceBase from "./SourceBase";

@JsonObject()
export default class PackageSettings {
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
    public buildDataSourceResults(): any {
        let ret: { [s: string]: any } = {};

        const hasResult = (resultObj: TDataSourceResult) => {
            return Utilities.hasValue(resultObj)
                && Utilities.hasStringValue(resultObj.Json)
                && Utilities.hasStringValue(resultObj.Object);
        };

        const buildSourceResults = <T extends SourceBase<T>>(builder: { [s: string]: TDataSourceResult }, sources: SourceBase<T>[]) => {
            for (let i: number = 0; i < sources.length; ++i) {
                if (!sources[i].IsActive) {
                    continue;
                }

                const source: SourceBase<T> = sources[i];
                if (hasResult(source.Result)) {
                    builder[source.Name] = source.Result.Object;
                }
            }
        }

        buildSourceResults(ret, this.DatabaseSources);
        buildSourceResults(ret, this.FileSources);
        buildSourceResults(ret, this.HttpSources);

        return ret;
    }
}