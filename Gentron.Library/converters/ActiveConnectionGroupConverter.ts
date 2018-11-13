import { ConnectionGroup, DatabaseConnection } from "../";
import { IPropertyConverter, JsonValue } from "ta-json";

export default class ActiveConnectionGroupConverter implements IPropertyConverter {
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