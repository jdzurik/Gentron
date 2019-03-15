import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class HttpConnection extends ConnectionBase<HttpConnection> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public Url: string;

    @JsonProperty()
    public PostBody: string;

    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Url = '';
        this.PostBody = '';
    }


    /*
     *  Methods
     */
    public clone(): HttpConnection {
        const ret: HttpConnection = new HttpConnection();
        ret.Url = this.Url;
        ret.PostBody = this.PostBody;
        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Username = this.Username;
        ret.Password = this.Password;
        return ret;
    }


    public update(connection: HttpConnection): void {
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }
        this.Url = connection.Url;
        this.PostBody = connection.PostBody;
        this.IsActive = connection.IsActive;
        this.Name = connection.Name;
        this.Username = connection.Username;
        this.Password = connection.Password;
    }
}