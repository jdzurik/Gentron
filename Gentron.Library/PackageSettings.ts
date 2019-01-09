import { DatabaseSource, Engine, Environment, FileSource, HttpSource, ObjectUtils } from "./";
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
        this.PackageName = '';
        this.ReadMe = '';
    }


    /*
     *  Methods
     */
    public buildDataSourceResults(): any {
        let ret: { [s: string]: any } = {};

        const buildSourceResults = <T extends SourceBase<T>>(builder: { [s: string]: TDataSourceResult }, sources: SourceBase<T>[]) => {
            for (let i: number = 0; i < sources.length; ++i) {
                if (!sources[i].IsActive) {
                    continue;
                }

                const source: SourceBase<T> = sources[i];
                if (ObjectUtils.hasObjectValue(source.Result) && ObjectUtils.hasObjectValue(source.Result.Object)) {
                    builder[source.Name] = source.Result.Object;
                }
            }
        }

        buildSourceResults(ret, this.DatabaseSources);
        buildSourceResults(ret, this.FileSources);
        buildSourceResults(ret, this.HttpSources);
        
        return ret;
    }


    public mergeResults(packageSettingsJson: PackageSettings): void {
        if (!ObjectUtils.hasObjectValue(packageSettingsJson)) {
            return;
        }

        const mergeSourceResults = (thisSources: any[], thatSources: any[]): void => {
            if (ObjectUtils.hasObjectValue(thisSources) && ObjectUtils.hasObjectValue(thatSources)) {
                for (let i: number = 0; i < thisSources.length; ++i) {
                    const thisSource: DatabaseSource = thisSources[i];

                    for (let j: number = 0; j < thatSources.length; ++j) {
                        const thatSource: DatabaseSource = thatSources[j];

                        if (thisSource.ID === thatSource.ID)  {
                            if (!ObjectUtils.hasObjectValue(thisSource.Result) && ObjectUtils.hasObjectValue(thatSource.Result)) {
                                thisSource.Result = thatSource.Result;
                            }
                        }
                    }
                }
            }
        };

        mergeSourceResults(this.DatabaseSources, packageSettingsJson.DatabaseSources);
        mergeSourceResults(this.FileSources, packageSettingsJson.FileSources);
        mergeSourceResults(this.HttpSources, packageSettingsJson.HttpSources);
    }
}