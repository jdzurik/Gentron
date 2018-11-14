import { Result, TDataSourceResult } from "../results";

export default interface IQueryProvider {
    executeQuery(connStr: string, queryStr: string, formatResults: boolean): Promise<Result<TDataSourceResult>>;
}