import { IResultBase, ResultBase } from "./ResultBase";

export interface IGentronFsResult<T> extends IResultBase<T> {
    InfoMessage: string;
}

export class GentronFsResult<T> extends ResultBase<T> implements IGentronFsResult<T> {
    /*
     *  Properties & Fields
     */
    public InfoMessage: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.InfoMessage = "";
    }


    /*
     *  Methods
     */
    public static fail<T>(errorMessage?: string, result?: T): IGentronFsResult<T> {
        const ret: IGentronFsResult<T> = new GentronFsResult<T>();
        ret.ErrorMessage = errorMessage || "Application Error";
        ret.IsError = true;
        ret.Result = result as any as T;

        return ret;
    }

    public static ok<T>(result?: T, infoMessage?: string): IGentronFsResult<T> {
        const ret: IGentronFsResult<T> = new GentronFsResult<T>();
        ret.ErrorMessage = "";
        ret.InfoMessage = infoMessage || "";
        ret.IsError = false;
        ret.Result = result as any as T;

        return ret;
    }
}