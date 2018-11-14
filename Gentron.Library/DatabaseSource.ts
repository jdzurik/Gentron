//import * as MsSql from "mssql/msnodesqlv8";
import { ActiveConnectionGroupConverter, FileJsonConverter } from "./converters";
import { ConnectionGroup, DatabaseConnection, File, Utilities } from "./";
import { InfoMessages } from "./constants";
import { JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType } from "ta-json";
import { Result, TDataSourceResult } from "./results";
import SourceBase from "./SourceBase";
//const sql = require('mssql/msnodesqlv8');

@JsonObject()
export default class DatabaseSource extends SourceBase<DatabaseSource> {
    /*
     *  Properties & Fields 
     */
    private static readonly _jsonColumnId: string = "JSON_F52E2B61-18A1-11d1-B105-00805F49916B";
    private static readonly _xmlColumnId: string = "XML_F52E2B61-18A1-11d1-B105-00805F49916B";

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


    private async onExecuteQueryFail(data: any, message: string, formatResults: boolean): Promise<Result<TDataSourceResult>> {
        const error = {
            Error: {
                Message: message,
                Data: `${data}`
            }
        };

        const ret: TDataSourceResult = {
            Json: (formatResults)
                ? JSON.stringify(error, null, 4)
                : JSON.stringify(error),
            Object: null,
            Xml: await Utilities.jsonToXmlStr(error, formatResults)
        };

        return Result.fail<TDataSourceResult>(message, ret);
    }


    //public async executeQuery(formatResults: boolean = true): Promise<Result<TDataSourceResult>> {
    //    const connStr: string = this.ActiveConnectionGroup.Connections[0].ConnectionString;
    //    const queryStr: string = this.Script.Contents;

    //    let connPool: MsSql.ConnectionPool = null as any as MsSql.ConnectionPool;
    //    let recordsets: MsSql.IRecordSet<any>;

    //    try {
    //        connPool = await new MsSql.ConnectionPool(connStr);
    //        await connPool.connect();
    //        const result: MsSql.IResult<any> = await new MsSql.Request(connPool).query(queryStr);
    //        recordsets = await result.recordset;
    //    }
    //    catch (e) {
    //        return await this.onExecuteQueryFail(queryStr, Utilities.getErrorMessage(e), formatResults);
    //    }
    //    finally {
    //        if (Utilities.hasValue(connPool) && connPool.connected) {
    //            await connPool.close();
    //        }
    //    }

    //    if (!Utilities.hasValue(recordsets)) {
    //        return await this.onExecuteQueryFail(queryStr, InfoMessages.QUERY_RESULTS_NULL, formatResults);
    //    }

    //    if (recordsets.length === 1) {
    //        const recordset: any = recordsets[0];

    //        const resultAsJson: any = recordset[DatabaseSource._jsonColumnId];
    //        if (Utilities.hasValue(resultAsJson)) {
    //            const ret: TDataSourceResult = {
    //                Json: (formatResults)
    //                    ? JSON.stringify(resultAsJson, null, 4)
    //                    : JSON.stringify(resultAsJson),
    //                Object: resultAsJson,
    //                Xml: await Utilities.jsonStrToXmlStr(JSON.stringify(resultAsJson), formatResults)
    //            };

    //            return Result.ok<TDataSourceResult>(ret);
    //        }

    //        const resultAsXml: any = recordset[DatabaseSource._xmlColumnId];
    //        if (Utilities.hasValue(resultAsXml)) {
    //            const ret: TDataSourceResult = {
    //                Json: Utilities.xmlStrToJsonStr(resultAsXml, formatResults),
    //                Object: resultAsXml,
    //                Xml: (formatResults)
    //                    ? await Utilities.formatXml(resultAsXml)
    //                    : resultAsXml
    //            };

    //            return Result.ok<TDataSourceResult>(ret);
    //        }
    //    }

    //    const ret: TDataSourceResult = {
    //        Json: (formatResults)
    //            ? JSON.stringify(recordsets, null, 4)
    //            : JSON.stringify(recordsets),
    //        Object: recordsets,
    //        Xml: await Utilities.jsonStrToXmlStr(JSON.stringify(recordsets), formatResults)
    //    };

    //    return Result.ok<TDataSourceResult>(ret);
    //}


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