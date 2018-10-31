"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class ProjectSettings extends abstract_1.JsonSerializable {
    get DatabaseConnections() {
        return this._databaseConnections;
    }
    set DatabaseConnections(value) {
        this._databaseConnections = value;
    }
    get FileConnections() {
        return this._fileConnections;
    }
    set FileConnections(value) {
        this._fileConnections = value;
    }
    get HttpConnections() {
        return this._httpConnections;
    }
    set HttpConnections(value) {
        this._httpConnections = value;
    }
    get LocalPackageFolder() {
        return this._localPackageFolder;
    }
    set LocalPackageFolder(value) {
        this._localPackageFolder = value;
    }
    get OutputPathGroups() {
        return this._outputPathGroups;
    }
    set OutputPathGroups(value) {
        this._outputPathGroups = value;
    }
    get RemotePackageLocation() {
        return this._remotePackageLocation;
    }
    set RemotePackageLocation(value) {
        this._remotePackageLocation = value;
    }
    constructor() {
        super();
        this._databaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this._outputPathGroups = [];
        this._remotePackageLocation = "";
    }
    static fromJson(obj) {
        const ret = new ProjectSettings();
        ret.DatabaseConnections = obj.DatabaseConnections;
        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputPathGroups = obj.OutputPathGroups;
        ret.RemotePackageLocation = obj.RemotePackageLocation;
        return ret;
    }
    toJson() {
        return {
            DatabaseConnections: this.DatabaseConnections,
            FileConnections: this.FileConnections,
            HttpConnections: this.HttpConnections,
            LocalPackageFolder: this.LocalPackageFolder,
            OutputPathGroups: this.OutputPathGroups,
            RemotePackageLocation: this.RemotePackageLocation,
        };
    }
    static toJson(obj) {
        return {
            DatabaseConnections: obj.DatabaseConnections,
            FileConnections: obj.FileConnections,
            HttpConnections: obj.HttpConnections,
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputPathGroups: obj.OutputPathGroups,
            RemotePackageLocation: obj.RemotePackageLocation,
        };
    }
}
exports.ProjectSettings = ProjectSettings;
