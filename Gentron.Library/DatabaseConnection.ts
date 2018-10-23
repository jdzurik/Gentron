import { ConnectionBase, IConnectionBase } from "./ConnectionBase";

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
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public update(dbConnection: DatabaseConnection): void {
        this.ConnectionString = dbConnection.ConnectionString;
        this.Environment = dbConnection.Environment;
        this.IsActive = dbConnection.IsActive;
    }
}