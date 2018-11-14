import { ActiveConnectionGroupConverter, FileJsonConverter } from "./converters";
import { ConnectionGroup, DatabaseConnection, File, Utilities } from "./";
import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType } from "ta-json";
import { Result, TDataSourceResult } from "./results";
import IQueryProvider from "./queryProviders/IQueryProvider";
import SourceBase from "./SourceBase";

@JsonObject()
export default class DatabaseSource extends SourceBase<DatabaseSource> {
    /*
     *  Properties & Fields 
     */
    private static _msSqlQueryProvider: IQueryProvider;

    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    @JsonConverter(ActiveConnectionGroupConverter)
    public ActiveConnectionGroup: ConnectionGroup<DatabaseConnection>;

    @JsonProperty()
    @JsonType(File)
    @JsonConverter(FileJsonConverter)
    public Script: File;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ActiveConnectionGroup = new ConnectionGroup<DatabaseConnection>();
        this.Script = new File();
    }


    /*
     *  Methods
     */
    public clone(): DatabaseSource {
        const ret: DatabaseSource = new DatabaseSource();

        ret._id = this._id;
        ret.ActiveConnectionGroup = this.ActiveConnectionGroup.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Script = this.Script.clone();

        return ret;
    }


    public async executeScript(): Promise<void> {
        let result: Result<TDataSourceResult>;

        try {
            result = await DatabaseSource._msSqlQueryProvider.executeQuery(this.ActiveConnectionGroup.Connections[0].ConnectionString, this.Script.Contents, true);
        }
        catch (e) {
            result = await DatabaseSource._msSqlQueryProvider.onExecuteQueryFail(this.Script.Contents, Utilities.getErrorMessage(e), true);
        }

        this.Result = result.Result;
    }


    public update(databaseSource: DatabaseSource): void {
        if (!Utilities.hasValue(databaseSource)) {
            return;
        }

        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;

        this.Script.update(databaseSource.Script);
    }
}    