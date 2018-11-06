import { ConnectionBase, IConnectionBase } from "./ConnectionBase";
import { JsonObject, JsonProperty } from "ta-json";

export interface IFileConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    Environment: string;
}

@JsonObject()
export class FileConnection extends ConnectionBase implements IFileConnection {
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
    public clone(): FileConnection {
        const ret: FileConnection = new FileConnection();

        ret._id = this._id;
        ret.Environment = this.Environment;
        ret.IsActive = this.IsActive;

        return ret;
    }


    public update(connection: FileConnection): void {
        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
}