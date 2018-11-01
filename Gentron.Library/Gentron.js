"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const abstract_1 = require("./abstract");
class Gentron extends abstract_1.JsonSerializable {
    get ID() {
        return this._id;
    }
    get PackageSettings() {
        return this._packageSettings;
    }
    set PackageSettings(value) {
        this._packageSettings = value;
    }
    get ProjectSettings() {
        return this._projectSettings;
    }
    set ProjectSettings(value) {
        this._projectSettings = value;
    }
    constructor(id) {
        super();
        this._id = id || _1.Utilities.newCryptoGuid();
        this._packageSettings = new _1.PackageSettings();
        this._projectSettings = new _1.ProjectSettings();
    }
    static fromJson(obj) {
        const ret = new Gentron(obj.ID);
        ret.PackageSettings = _1.PackageSettings.fromJson(obj.PackageSettings);
        ret.ProjectSettings = _1.ProjectSettings.fromJson(obj.ProjectSettings);
        return ret;
    }
    static toJson(obj) {
        return {
            ID: obj.ID,
            PackageSettings: _1.PackageSettings.toJson(obj.PackageSettings),
            ProjectSettings: _1.ProjectSettings.toJson(obj.ProjectSettings),
        };
    }
    static save() {
    }
    static saveAs() {
    }
    static open() {
    }
}
exports.Gentron = Gentron;
