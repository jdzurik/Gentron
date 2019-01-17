"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class FileJsonConverter {
    serialize(property) {
        property.writeContents();
        const ret = {};
        ret.ID = property.ID;
        ret.Path = property.Path;
        if (__1.Utilities.hasValue(property.LastModified)) {
            let dateStr = "";
            try {
                dateStr = property.LastModified.toDateString();
            }
            catch (_a) { }
            if (!isNaN(Date.parse(dateStr))) {
                ret.LastModified = dateStr;
            }
        }
        return ret;
    }
    deserialize(_value) {
        const value = _value;
        const file = new __1.File();
        file._id = value.ID;
        try {
            file.LastModified = new Date(Date.parse(_value.LastModified));
        }
        catch (_a) { }
        file.Path = value.Path;
        file.loadContents();
        return file;
    }
}
exports.default = FileJsonConverter;
//# sourceMappingURL=FileJsonConverter.js.map