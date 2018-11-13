export default class Result<T> {
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
    public static fail<T>(errorMessage?: string, result?: T): Result<T> {
        const ret: Result<T> = new Result<T>();
        ret.ErrorMessage = errorMessage || "Application Error";
        ret.IsError = true;
        ret.Result = result as any as T;

        return ret;
    }

    public static ok<T>(result?: T): Result<T> {
        const ret: Result<T> = new Result<T>();
        ret.ErrorMessage = "";
        ret.IsError = false;
        ret.Result = result as any as T;

        return ret;
    }
}