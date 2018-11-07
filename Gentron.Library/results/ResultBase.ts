export interface IResultBase<T> {
    ErrorMessage: string;
    IsError: boolean
    Result: T;
}

export class ResultBase<T> implements IResultBase<T> {
    /*
     *  Properties & Fields
     */
    public ErrorMessage: string;
    public IsError: boolean;
    public Result: T;


    /*
     *  Constructors
     */
    public constructor() {
        this.ErrorMessage = "";
        this.IsError = false;
        this.Result = null as any as T;
    }


    /*
     *  Methods
     */
    public static fail<T>(errorMessage?: string, result?: T): IResultBase<T> {
        const ret: IResultBase<T> = new ResultBase<T>();
        ret.ErrorMessage = errorMessage || "Application Error";
        ret.IsError = true;
        ret.Result = result as any as T;

        return ret;
    }

    public static ok<T>(result?: T): IResultBase<T> {
        const ret: IResultBase<T> = new ResultBase<T>();
        ret.ErrorMessage = "";
        ret.IsError = false;
        ret.Result = result as any as T;

        return ret;
    }
}