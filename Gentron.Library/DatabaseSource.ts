import { ConnectionGroup, File, IConnectionGroup, IDatabaseConnection, IFile } from "./";
import { ISourceBase, SourceBase } from "./SourceBase";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";

export interface IDatabaseSource extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    ActiveConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    Script?: IFile;
}

@JsonObject()
export class DatabaseSource extends SourceBase implements IDatabaseSource {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    public ActiveConnectionGroup: IConnectionGroup<IDatabaseConnection>;

    @JsonProperty()
    public Script: IFile;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ActiveConnectionGroup = new ConnectionGroup<IDatabaseConnection>();
        this.Script = new File();
    }


    /*
     *  Methods
     */
    public clone(): IDatabaseSource {
        const ret: DatabaseSource = new DatabaseSource();

        ret._id = this._id;
        ret.ActiveConnectionGroup = this.ActiveConnectionGroup.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Script = this.Script;

        return ret;
    }


    public update(databaseSource: IDatabaseSource): void {
        if (typeof (databaseSource) === typeof (undefined) || databaseSource === null) {
            return;
        }

        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;

        this.Script.update(databaseSource.Script as IFile);
        //if (Utilities.hasValue(this.Script)
        //    && Utilities.hasValue(databaseSource.Script)
        //    && this.Script.Path !== databaseSource.Script.Path) {
        //}
    }
}