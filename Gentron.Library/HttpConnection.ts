import { ConnectionBase, IConnectionBase } from "./ConnectionBase";
import { NonFunctionProperties } from "./types";

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
    public fromJson(json: NonFunctionProperties<IHttpConnection>): IHttpConnection {
        this._environment = json.Environment;
        this._isActive = json.IsActive;

        return this;
    }

    public toJson(): NonFunctionProperties<IHttpConnection> {
        return {
            Environment: this._environment,
            ID: this._id,
            IsActive: this._isActive
        };
    }

    public clone(): HttpConnection {
        throw new Error("Method not implemented");
    }

    public update(dbConnection: HttpConnection): void {
        throw new Error("Method not implemented");
    }
}