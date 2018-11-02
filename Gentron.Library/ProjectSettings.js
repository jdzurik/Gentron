"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const OutputPathGroup_1 = require("./OutputPathGroup");
class ProjectSettings {
    get DatabaseConnections() {
        return this._databaseConnections;
    }
    set DatabaseConnections(value) {
        this._databaseConnections = value;
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
        this._databaseConnections = [];
        this._localPackageFolder = "";
        this._outputPathGroups = [];
        this._remotePackageLocation = "";
    }
    fromJson(json) {
        this._databaseConnections = json.DatabaseConnections.map((group, index) => new _1.ConnectionGroup().fromJson(group));
        this._localPackageFolder = json.LocalPackageFolder;
        this._outputPathGroups = json.OutputPathGroups.map((group, index) => new OutputPathGroup_1.OutputPathGroup().fromJson(group));
        this._remotePackageLocation = json.RemotePackageLocation;
        return this;
    }
    toJson() {
        return {
            DatabaseConnections: this._databaseConnections.map((connection, index) => connection.toJson()),
            LocalPackageFolder: this._localPackageFolder,
            OutputPathGroups: this._outputPathGroups.map((connection, index) => connection.toJson()),
            RemotePackageLocation: this._remotePackageLocation
        };
    }
}
exports.ProjectSettings = ProjectSettings;
