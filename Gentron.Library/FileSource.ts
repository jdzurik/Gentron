import { File, Utilities } from "./";
import { FileJsonConverter } from "./converters";
import { JsonConverter, JsonObject, JsonProperty, JsonType, OnDeserialized } from "ta-json";
import SourceBase from "./SourceBase";

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


    @OnDeserialized()
    public onDeserialized(): void {
        this.Result = {
            Json: "",
            Object: null,
            Xml: ""
        };

        if (Utilities.hasObjectValue(this.DataFile)
            && Utilities.hasStringValue(this.DataFile.Path)
            && Utilities.hasStringValue(this.DataFile.Contents)) {

            try {
                const parsed: any = JSON.parse(this.DataFile.Contents);
                this.Result = {
                    Json: JSON.stringify(parsed, null, 4),
                    Object: parsed,
                    Xml: ""
                };
            }
            catch { }
        }
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