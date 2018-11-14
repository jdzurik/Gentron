import { JsonObject, JsonProperty, JsonType, JsonConverter } from "ta-json";
import SourceBase from "./SourceBase";
import { File, Utilities } from "./";
import { FileJsonConverter } from "./converters";

@JsonObject()
export default class FileSource extends SourceBase<FileSource> {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    @JsonType(File)
    @JsonConverter(FileJsonConverter)
    public DataFile: File;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.DataFile = new File();
    }


    /*
     *  Methods
     */
    public clone(): FileSource {
        const ret: FileSource = new FileSource();

        ret._id = this._id;
        ret.DataFile = this.DataFile.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;

        return ret;
    }


    public update(fileSource: FileSource): void {
        if (!Utilities.hasValue(fileSource)) {
            return;
        }

        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;

        this.DataFile.update(fileSource.DataFile);
        if (this.DataFile.Contents) {
            try {
                this.Result.Json = this.DataFile.Contents;
                this.Result.Object = JSON.parse(this.Result.Json);
            }
            catch (e) {
                this.Result = {
                    Json: "", Object: null, Xml: "" };
            }
        }
    }
}