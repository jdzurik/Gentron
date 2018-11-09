import { ConnectionGroup, DatabaseConnection, File, Utilities } from "./";
import { IPropertyConverter, JsonConverter, JsonElementType, JsonObject, JsonProperty, JsonType, JsonValue } from "ta-json";
import { SourceBase } from "./SourceBase";

class ActiveConnectionGroupJsonConverter implements IPropertyConverter {
    public serialize(property: ConnectionGroup<DatabaseConnection>): JsonValue {
        return {
            ID: property.ID
        };
    }

    public deserialize(_value: JsonValue) {
        const value: ConnectionGroup<DatabaseConnection> = _value as any as ConnectionGroup<DatabaseConnection>;
        const connectionGroup: ConnectionGroup<DatabaseConnection> = new ConnectionGroup<DatabaseConnection>();
        (connectionGroup as any)._id = value.ID;
        return connectionGroup;
    }
}

@JsonObject()
export class DatabaseSource extends SourceBase<DatabaseSource> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    @JsonConverter(ActiveConnectionGroupJsonConverter)
    public ActiveConnectionGroup: ConnectionGroup<DatabaseConnection>;

    @JsonProperty()
    @JsonType(File)
    public Script: File;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.ActiveConnectionGroup = new ConnectionGroup<DatabaseConnection>();
        this.Script = new File();
    }


    /*
     *  Methods
     */
    public clone(): DatabaseSource {
        const ret: DatabaseSource = new DatabaseSource();

        ret._id = this._id;
        ret.ActiveConnectionGroup = this.ActiveConnectionGroup.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Script = this.Script.clone();

        return ret;
    }


    public update(databaseSource: DatabaseSource): void {
        if (!Utilities.hasValue(databaseSource)) {
            return;
        }

        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;

        this.Script.update(databaseSource.Script);
    }
}