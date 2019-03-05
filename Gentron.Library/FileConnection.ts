import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class FileConnection extends ConnectionBase<FileConnection> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public BasePath: string;

    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.BasePath = '';
    }


    /*
     *  Methods
     */
    public clone(): FileConnection {
        const ret: FileConnection = new FileConnection();

        ret._id = this._id;
        ret.BasePath = this.BasePath;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        return ret;
    }


    public update(connection: FileConnection): void {
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }

        this.BasePath = connection.BasePath;
        this.IsActive = connection.IsActive;
        this.Name = connection.Name;
    }
}