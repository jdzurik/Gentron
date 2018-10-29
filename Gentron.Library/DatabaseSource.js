"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const SourceBase_1 = require("./SourceBase");
class DatabaseSource extends SourceBase_1.SourceBase {
    get ActiveConnectionGroup() {
        return this._activeConnectionGroup;
    }
    set ActiveConnectionGroup(value) {
        this._activeConnectionGroup = value;
    }
    get Script() {
        return this._script;
    }
    set Script(value) {
        this._script = value;
    }
    constructor() {
        super();
        this._activeConnectionGroup = new _1.ConnectionGroup();
        this._script = new _1.File();
    }
    toJson() {
        throw new Error("Method not implemented");
    }
    update(databaseSource) {
        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;
        if (_1.Utilities.hasValue(this.Script)
            && _1.Utilities.hasValue(databaseSource.Script)
            && this.Script.Path !== databaseSource.Script.Path) {
            this.Script.update(databaseSource.Script);
        }
    }
}
exports.DatabaseSource = DatabaseSource;
