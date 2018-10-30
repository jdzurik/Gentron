import { ConnectionBase, IConnectionBase } from "./ConnectionBase";

export interface IHttpConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    Environment: string;
}

export class HttpConnection extends ConnectionBase implements IHttpConnection {
    /*
     *  Properties & Fields 
     */
    private _environment: string;

    public get Environment(): string {
        return this._environment;
    }

    public set Environment(value: string) {
        this._environment = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._environment = "";
    }


    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public clone(): HttpConnection {
        throw new Error("Method not implemented");
    }

    public update(dbConnection: HttpConnection): void {
        throw new Error("Method not implemented");
    }
}