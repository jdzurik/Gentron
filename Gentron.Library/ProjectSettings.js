"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectSettings {
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
    get OutputPaths() {
        return this._outputPaths;
    }
    set OutputPaths(value) {
        this._outputPaths = value;
    }
    get RemotePackageLocation() {
        return this._remotePackageLocation;
    }
    set RemotePackageLocation(value) {
        this._remotePackageLocation = value;
    }
    constructor() {
        this._databaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this._outputPaths = [];
        this._remotePackageLocation = "";
    }
    static fromJson(obj) {
        const ret = new ProjectSettings();
        ret.DatabaseConnections = obj.DatabaseConnections;
        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputPaths = obj.OutputPaths;
        ret.RemotePackageLocation = obj.RemotePackageLocation;
        return ret;
    }
    toJson() {
        return {
            DatabaseConnections: this.DatabaseConnections,
            FileConnections: this.FileConnections,
            HttpConnections: this.HttpConnections,
            LocalPackageFolder: this.LocalPackageFolder,
            OutputPaths: this.OutputPaths,
            RemotePackageLocation: this.RemotePackageLocation,
        };
    }
    static toJson(obj) {
        return {
            DatabaseConnections: obj.DatabaseConnections,
            FileConnections: obj.FileConnections,
            HttpConnections: obj.HttpConnections,
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputPaths: obj.OutputPaths,
            RemotePackageLocation: obj.RemotePackageLocation,
        };
    }
}
exports.ProjectSettings = ProjectSettings;
