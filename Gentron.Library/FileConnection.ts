import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import ConnectionBase from "./ConnectionBase";

@JsonObject()
export default class FileConnection extends ConnectionBase<FileConnection> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public DirectoryPath: string;

    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.DirectoryPath = '';
    }


    /*
     *  Methods
     */
    public clone(): FileConnection {
        const ret: FileConnection = new FileConnection();
        ret.DirectoryPath = this.DirectoryPath;
        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Username = this.Username;
        ret.Password = this.Password;
        return ret;
    }


    public update(connection: FileConnection): void {
        if (!ObjectUtils.hasValue(connection)) {
            return;
        }

        this.DirectoryPath = connection.DirectoryPath;
        this.IsActive = connection.IsActive;
        this.Name = connection.Name;
        this.Username = connection.Username;
        this.Password = connection.Password;
        
    }
}