import { File, Utilities } from "../";
import { IPropertyConverter, JsonValue } from "ta-json";

export default class FileJsonConverter implements IPropertyConverter {
    public serialize(property: File): JsonValue {
        property.writeContents();

        const ret: JsonValue = {};
        ret.ID = property.ID;
        ret.Path = property.Path;

        if (Utilities.hasValue(property.LastModified)) {
            let dateStr: string = "";
            try {
                dateStr = (property.LastModified as Date).toDateString();
            }
            catch { }

            if (!isNaN(Date.parse(dateStr))) {
                ret.LastModified = dateStr;
            }
        }

        return ret;
    }

    public deserialize(_value: JsonValue) {
        const value: File = _value as any as File;
        const file: File = new File();
        (file as any)._id = value.ID;
        try {
            file.LastModified = new Date(Date.parse((_value as any).LastModified as string));
        }
        catch { }
        file.Path = value.Path;
        file.loadContents();

        return file;
    }
}