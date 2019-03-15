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
        ret.ConnectionString = this.ConnectionString;
        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Username = this.Username;
        ret.Password = this.Password;
        return ret;
    }


    public update(connection: DatabaseConnection): void {
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }

        this.ConnectionString = connection.ConnectionString;
        this.IsActive = connection.IsActive;
        this.Name = connection.Name;
        this.Username = connection.Username;
        this.Password = connection.Password;
        
    }



}