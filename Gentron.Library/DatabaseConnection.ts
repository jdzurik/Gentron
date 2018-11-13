import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from ".";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class DatabaseConnection extends ConnectionBase<DatabaseConnection> {
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
    public clone(): DatabaseConnection {
        const ret: DatabaseConnection = new DatabaseConnection();

        ret._id = this._id;
        ret.ConnectionString = this.ConnectionString;
        ret.Environment = this.Environment;
        ret.IsActive = this.IsActive;

        return ret;
    }


    public update(connection: DatabaseConnection): void {
        if (!Utilities.hasValue(connection)) {
            return;
        }

        this.ConnectionString = connection.ConnectionString;
        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
}