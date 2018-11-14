import { Result, TDataSourceResult } from "../results";

export default interface IQueryProvider {
    onExecuteQueryFail(data: any, message: string, formatResults: boolean): Promise<Result<TDataSourceResult>>;
    executeQuery(connStr: string, queryStr: string, formatResults: boolean): Promise<Result<TDataSourceResult>>;
}