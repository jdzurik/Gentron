"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
class FileSource extends SourceBase_1.SourceBase {
    toJson() {
        return {
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result
        };
    }
    update(fileSource) {
        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
    }
}
exports.FileSource = FileSource;
