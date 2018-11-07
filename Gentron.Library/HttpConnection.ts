import { ConnectionBase, IConnectionBase } from "./ConnectionBase";
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from ".";

export interface IHttpConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    Environment: string;
}

@JsonObject()
export class HttpConnection extends ConnectionBase implements IHttpConnection {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public Environment: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Environment = "";
    }


    /*
     *  Methods
     */
    public clone(): HttpConnection {
        const ret: HttpConnection = new HttpConnection();

        ret._id = this._id;
        ret.Environment = this.Environment;
        ret.IsActive = this.IsActive;

        return ret;
    }


    public update(connection: HttpConnection): void {
        if (!Utilities.hasValue(connection)) {
            return;
        }

        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
}