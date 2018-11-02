"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
