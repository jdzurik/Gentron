import { File } from "../";
import { IPropertyConverter, JsonValue } from "ta-json";

export default class FileJsonConverter implements IPropertyConverter {
    public serialize(property: File): JsonValue {
        return {
            ID: property.ID,
            Path: property.Path
        };
    }

    public deserialize(_value: JsonValue) {
        const value: File = _value as any as File;
        const connectionGroup: File = new File();
        (connectionGroup as any)._id = value.ID;
        return connectionGroup;
    }
}