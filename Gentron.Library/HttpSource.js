"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
class HttpSource extends SourceBase_1.SourceBase {
    fromJson(json) {
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
    update(httpSource) {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}
exports.HttpSource = HttpSource;
