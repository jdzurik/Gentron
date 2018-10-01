import { ConnectionBase, IConnectionBase } from "./ConnectionBase";

export interface IDatabaseConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    Environment: string;
}

export class DatabaseConnection extends ConnectionBase implements IDatabaseConnection {
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
}