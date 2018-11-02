"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
class FileSource extends SourceBase_1.SourceBase {
    clone() {
        const ret = new FileSource();
        ret._id = this._id;
        ret._isActive = this._isActive;
        ret._name = this._name;
        ret._result = this._result;
        return ret;
    }
    fromJson(json) {
        this._id = json.ID;
        this._isActive = json.IsActive;
        this._name = json.Name;
        this._result = json.Result;
        return this;
    }
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
