"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class EngineCodeFileJsonConverter {
    serialize(property) {
        property.writeContents();
        const ret = {};
        ret.ID = property.ID;
        ret.Path = property.Path;
        ret.IncludeConsole = property.IncludeConsole;
        ret.IncludeDirname = property.IncludeDirname;
        ret.IncludeFilename = property.IncludeFilename;
        ret.IncludeRequires = property.IncludeRequires;
        ret.PackageList = (property.PackageList || []).map((module, index, arr) => {
            return Object.assign({}, module);
        });
        if (__1.ObjectUtils.hasValue(property.LastModified)) {
            let dateStr = '';
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
        const file = new __1.EngineCodeFile();
        file._id = value.ID;
        try {
            file.LastModified = new Date(Date.parse(_value.LastModified));
        }
        catch (_a) { }
        file.Path = value.Path;
        file.loadContents();
        file.IncludeConsole = value.IncludeConsole;
        file.IncludeDirname = value.IncludeDirname;
        file.IncludeFilename = value.IncludeFilename;
        file.IncludeRequires = value.IncludeRequires;
        file.PackageList = (value.PackageList || []).map((module, index, arr) => {
            return Object.assign({}, module);
        });
        return file;
    }
}
exports.default = EngineCodeFileJsonConverter;
//# sourceMappingURL=EngineCodeFileJsonConverter.js.map