"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const SourceBase_1 = require("./SourceBase");
const DatabaseConnection_1 = require("./DatabaseConnection");
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
        this._activeConnectionGroup = new _1.ConnectionGroup(() => new DatabaseConnection_1.DatabaseConnection());
        this._script = new _1.File();
    }
    fromJson(json) {
        this._activeConnectionGroup = this._activeConnectionGroup.fromJson(json.ActiveConnectionGroup);
        this._isActive = json.IsActive;
        this._name = json.Name;
        this._result = json.Result;
        this._script = this._script.fromJson(json.Script);
        return this;
    }
    toJson() {
        return {
            ActiveConnectionGroup: this._activeConnectionGroup.toJson(),
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result,
            Script: this._script.toJson()
        };
    }
    update(databaseSource) {
        if (typeof (databaseSource) === typeof (undefined) || databaseSource === null) {
            return;
        }
        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;
        this.Script.update(databaseSource.Script);
    }
}
exports.DatabaseSource = DatabaseSource;
