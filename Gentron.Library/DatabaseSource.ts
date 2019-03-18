import { ActiveConnectionGroupConverter, FileJsonConverter } from './converters';
import { ProjectSettings, DatabaseConnection, File, ObjectUtils } from './';
import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType } from 'ta-json';
import { Result, TDataSourceResult } from './results';
import IQueryProvider from './queryProviders/IQueryProvider';
import SourceBase from './SourceBase';
import SourceDriverFile from './SourceDriverFile';

@JsonObject()
export default class DatabaseSource extends SourceBase<DatabaseSource> {
    /*
     *  Properties & Fields
     */
     // non serialized property - populated by constructor
     public Project: ProjectSettings;


    @JsonProperty()
    @JsonType(File)
    @JsonConverter(FileJsonConverter)
    public Script: File;


    /*
     *  Constructors
     */
    public constructor(project: ProjectSettings) {
        super();
        this.Project = project;
        this.Script = new File();
        this.DataDriver = new SourceDriverFile();
        this.Name = '';
    }


    /*
     *  Methods
     */
    public clone(): DatabaseSource {
        const ret: DatabaseSource = new DatabaseSource(this.Project);

        ret._id = this._id;
        ret.Project = this.Project;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Script = this.Script.clone();
        ret.DataDriver = this.DataDriver.clone();
        return ret;
    }

    public async executeScriptWithDriver(): Promise<void> {
        let result: Result<TDataSourceResult>;

        // try {
        //     result = await DatabaseSource._msSqlQueryProvider.executeQuery(
        //         this.ActiveConnectionGroup.Connections[0].ConnectionString, this.Script.Contents, true);
        // } catch (e) {
        //     result = await DatabaseSource._msSqlQueryProvider.onExecuteQueryFail(
        //         this.Script.Contents, ObjectUtils.getErrorMessage(e), true);
        // }
        //this.Result = result.Result;
    }

    public async executeScript(): Promise<void> {
        // let result: Result<TDataSourceResult>;

        // try {
        //     result = await DatabaseSource._msSqlQueryProvider.executeQuery(
        //         this.ActiveConnectionGroup.Connections[0].ConnectionString, this.Script.Contents, true);
        // } catch (e) {
        //     result = await DatabaseSource._msSqlQueryProvider.onExecuteQueryFail(
        //         this.Script.Contents, ObjectUtils.getErrorMessage(e), true);
        // }

        // this.Result = result.Result;
    }


    public update(databaseSource: DatabaseSource): void {
        if (!ObjectUtils.hasValue(databaseSource)) {
            return;
        }

        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;
        this.Script.update(databaseSource.Script);
    }
}
