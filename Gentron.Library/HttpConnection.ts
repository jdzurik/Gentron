import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class HttpConnection extends ConnectionBase<HttpConnection> {
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
        this.Environment = '';
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
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }

        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
}