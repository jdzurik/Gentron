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
    fromJson(json) {
        this._id = json.ID;
        this._packageSettings = this._packageSettings.fromJson(json.PackageSettings);
        this._projectSettings = this._projectSettings.fromJson(json.ProjectSettings);
        return this;
    }
    toJson() {
        return {
            ID: this._id,
            PackageSettings: this._packageSettings.toJson(),
            ProjectSettings: this._projectSettings.toJson()
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
