"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Gentron {
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
    toJson() {
        return {
            ID: this.ID,
            PackageSettings: this.PackageSettings.toJson(),
            ProjectSettings: this.ProjectSettings.toJson(),
        };
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
