﻿import { ConnectionBase, IConnectionBase } from "./ConnectionBase";
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
    public toJson(): NonFunctionProperties<IDatabaseConnection> {
        return {
            ConnectionString: this._connectionString,
            Environment: this._environment,
            ID: this._id,
            IsActive: this._isActive
        };
    }

    public clone(): DatabaseConnection {
        const ret: DatabaseConnection = new DatabaseConnection();

        ret._cloneId = this._id;
        ret._connectionString = this._connectionString;
        ret._environment = this._environment;
        ret._isActive = this._isActive;
        ret._isClone = true;

        return ret;
    }

    public update(dbConnection: DatabaseConnection): void {
        this.ConnectionString = dbConnection.ConnectionString;
        this.Environment = dbConnection.Environment;
        this.IsActive = dbConnection.IsActive;
    }
}