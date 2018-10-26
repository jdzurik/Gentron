"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PackageSettings_1 = require("./PackageSettings");
const ProjectSettings_1 = require("./ProjectSettings");
const Guid_1 = require("./utils/Guid");
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
        this._id = id || Guid_1.default.newCryptoGuid();
        this._packageSettings = new PackageSettings_1.PackageSettings();
        this._projectSettings = new ProjectSettings_1.ProjectSettings();
    }
    static fromJson(obj) {
        const ret = new Gentron(obj.ID);
        ret.PackageSettings = PackageSettings_1.PackageSettings.fromJson(obj.PackageSettings);
        ret.ProjectSettings = ProjectSettings_1.ProjectSettings.fromJson(obj.ProjectSettings);
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
            PackageSettings: PackageSettings_1.PackageSettings.toJson(obj.PackageSettings),
            ProjectSettings: ProjectSettings_1.ProjectSettings.toJson(obj.ProjectSettings),
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
