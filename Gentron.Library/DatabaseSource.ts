import { ConnectionGroup, File, IConnectionGroup, IDatabaseConnection, IFile, DatabaseConnection, Utilities } from "./";
import { ISourceBase, SourceBase } from "./SourceBase";
import { JsonElementType, JsonObject, JsonProperty, JsonConverter, IPropertyConverter, JsonValue, JsonValueObject } from "ta-json";

export interface IDatabaseSource extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    ActiveConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    Script?: IFile;
}

class ActiveConnectionGroupJsonConverter implements IPropertyConverter {
    public serialize(property: IConnectionGroup<IDatabaseConnection>): JsonValue {
        return {
            ID: property.ID
        };
    }

    public deserialize(_value: JsonValue) {
        const value: IConnectionGroup<IDatabaseConnection> = _value as any as IConnectionGroup<IDatabaseConnection>;
        const connectionGroup: IConnectionGroup<IDatabaseConnection> = new ConnectionGroup<IDatabaseConnection>();
        (connectionGroup as any)._id = value.ID;
        return connectionGroup;
    }
}

@JsonObject()
export class DatabaseSource extends SourceBase implements IDatabaseSource {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    @JsonConverter(ActiveConnectionGroupJsonConverter)
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
        if (!Utilities.hasValue(databaseSource)) {
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