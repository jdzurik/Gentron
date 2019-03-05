import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from ".";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class DatabaseConnection extends ConnectionBase<DatabaseConnection> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public ConnectionString: string;

    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ConnectionString = '';
    }


    /*
     *  Methods
     */
    public clone(): DatabaseConnection {
        const ret: DatabaseConnection = new DatabaseConnection();

        ret._id = this._id;
        ret.ConnectionString = this.ConnectionString;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        return ret;
    }


    public update(connection: DatabaseConnection): void {
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }

        this.ConnectionString = connection.ConnectionString;
        this.IsActive = connection.IsActive;
        this.Name = connection.Name;
    }
}