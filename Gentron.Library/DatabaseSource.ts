import { DatabaseConnection, IDatabaseConnection } from "./DatabaseConnection";
import { SourceBase, ISourceBase } from "./SourceBase";

export interface IDatabaseSource extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    ActiveConnection: IDatabaseConnection;
}

export class DatabaseSource extends SourceBase implements IDatabaseSource {
    /*
     *  Properties & Fields 
     */
    private _activeConnection: IDatabaseConnection;

    public get ActiveConnection(): IDatabaseConnection {
        return this._activeConnection;
    }

    public set ActiveConnection(value: IDatabaseConnection) {
        this._activeConnection = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._activeConnection = new DatabaseConnection();
    }


    /*
     *  Methods
     */
}