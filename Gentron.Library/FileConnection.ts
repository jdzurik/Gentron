import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class FileConnection extends ConnectionBase<FileConnection> {
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
    public clone(): FileConnection {
        const ret: FileConnection = new FileConnection();

        ret._id = this._id;
        ret.Environment = this.Environment;
        ret.IsActive = this.IsActive;

        return ret;
    }


    public update(connection: FileConnection): void {
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }

        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
}