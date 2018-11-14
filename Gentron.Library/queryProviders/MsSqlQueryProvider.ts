import { TDataSourceResult, Result } from "../results";
import { Utilities } from "../";
import { InfoMessages } from "../constants";

import * as MsSql from "mssql/msnodesqlv8";
import IQueryProvider from "./IQueryProvider";

export default class MsSqlQueryProvider implements IQueryProvider {
    /*
     *  Properties & Fields 
     */
    private static readonly _jsonColumnId: string = "JSON_F52E2B61-18A1-11d1-B105-00805F49916B";
    private static readonly _xmlColumnId: string = "XML_F52E2B61-18A1-11d1-B105-00805F49916B";


    /*
     *  Constructors 
     */


    /*
     *  Methods
     */
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

    public async executeQuery(connStr: string, queryStr: string, formatResults: boolean = true): Promise<Result<TDataSourceResult>> {
        let connPool: MsSql.ConnectionPool = null as any as MsSql.ConnectionPool;
        let recordsets: MsSql.IRecordSet<any>;

        try {
            connPool = await new MsSql.ConnectionPool(connStr);
            await connPool.connect();
            const result: MsSql.IResult<any> = await new MsSql.Request(connPool).query(queryStr);
            recordsets = await result.recordset;
        }
        catch (e) {
            return await this.onExecuteQueryFail(queryStr, Utilities.getErrorMessage(e), formatResults);
        }
        finally {
            if (Utilities.hasValue(connPool) && connPool.connected) {
                await connPool.close();
            }
        }

        if (!Utilities.hasValue(recordsets)) {
            return await this.onExecuteQueryFail(queryStr, InfoMessages.QUERY_RESULTS_NULL, formatResults);
        }

        if (recordsets.length === 1) {
            const recordset: any = recordsets[0];

            const resultAsJson: any = recordset[MsSqlQueryProvider._jsonColumnId];
            if (Utilities.hasValue(resultAsJson)) {
                const ret: TDataSourceResult = {
                    Json: (formatResults)
                        ? JSON.stringify(resultAsJson, null, 4)
                        : JSON.stringify(resultAsJson),
                    Object: resultAsJson,
                    Xml: await Utilities.jsonStrToXmlStr(JSON.stringify(resultAsJson), formatResults)
                };

                return Result.ok<TDataSourceResult>(ret);
            }

            const resultAsXml: any = recordset[MsSqlQueryProvider._xmlColumnId];
            if (Utilities.hasValue(resultAsXml)) {
                const ret: TDataSourceResult = {
                    Json: Utilities.xmlStrToJsonStr(resultAsXml, formatResults),
                    Object: resultAsXml,
                    Xml: (formatResults)
                        ? await Utilities.formatXml(resultAsXml)
                        : resultAsXml
                };

                return Result.ok<TDataSourceResult>(ret);
            }
        }

        const ret: TDataSourceResult = {
            Json: (formatResults)
                ? JSON.stringify(recordsets, null, 4)
                : JSON.stringify(recordsets),
            Object: recordsets,
            Xml: await Utilities.jsonStrToXmlStr(JSON.stringify(recordsets), formatResults)
        };

        return Result.ok<TDataSourceResult>(ret);
    }
}