import { ConnectionBase, IConnectionBase } from "./ConnectionBase";
import { NonFunctionProperties } from "./types";

export interface IDatabaseConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    ConnectionString: string;
    Environment: string;
}

export class DatabaseConnection extends ConnectionBase implements IDatabaseConnection {
    /*
     *  Properties & Fields 
     */
    private _connectionString: string;

    public get ConnectionString(): string {
        return this._connectionString;
    }

    public set ConnectionString(value: string) {
        this._connectionString = value;
    }


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
        this._connectionString = "";
        this._environment = "";
    }


    /*
     *  Methods
     */
    public clone(): IDatabaseConnection {
        const ret: DatabaseConnection = new DatabaseConnection();

        ret._connectionString = this._connectionString;
        ret._environment = this._environment;
        ret._id = this._id;
        ret._isActive = this._isActive;

        return ret;
    }

    public fromJson(json: NonFunctionProperties<IDatabaseConnection>): IDatabaseConnection {
        this._connectionString = json.ConnectionString;
        this._environment = json.Environment;
        this._id = json.ID;
        this._isActive = json.IsActive;


        return this;
    }

    public toJson(): NonFunctionProperties<IDatabaseConnection> {
        return {
            ConnectionString: this._connectionString,
            Environment: this._environment,
            ID: this._id,
            IsActive: this._isActive
        };
    }

    public update(dbConnection: DatabaseConnection): void {
        this.ConnectionString = dbConnection.ConnectionString;
        this.Environment = dbConnection.Environment;
        this.IsActive = dbConnection.IsActive;
    }
}