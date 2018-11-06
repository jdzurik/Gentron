import { ConnectionBase, IConnectionBase } from "./ConnectionBase";
import { JsonObject, JsonProperty } from "ta-json";

export interface IDatabaseConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    ConnectionString: string;
    Environment: string;
}

@JsonObject()
export class DatabaseConnection extends ConnectionBase implements IDatabaseConnection {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public ConnectionString: string;

    @JsonProperty()
    public Environment: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ConnectionString = "";
        this.Environment = "";
    }


    /*
     *  Methods
     */
    public clone(): IDatabaseConnection {
        const ret: DatabaseConnection = new DatabaseConnection();

        ret._id = this._id;
        ret.ConnectionString = this.ConnectionString;
        ret.Environment = this.Environment;
        ret.IsActive = this.IsActive;

        return ret;
    }


    public update(connection: DatabaseConnection): void {
        this.ConnectionString = connection.ConnectionString;
        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
}