"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectSettings = (function () {
    function ProjectSettings() {
        this.DatabaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this.OutputPaths = [];
        this._remotePackageLocation = "";
    }
    Object.defineProperty(ProjectSettings.prototype, "FileConnections", {
        get: function () {
            return this._fileConnections;
        },
        set: function (value) {
            this._fileConnections = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "HttpConnections", {
        get: function () {
            return this._httpConnections;
        },
        set: function (value) {
            this._httpConnections = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "LocalPackageFolder", {
        get: function () {
            return this._localPackageFolder;
        },
        set: function (value) {
            this._localPackageFolder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectSettings.prototype, "RemotePackageLocation", {
        get: function () {
            return this._remotePackageLocation;
        },
        set: function (value) {
            this._remotePackageLocation = value;
        },
        enumerable: true,
        configurable: true
    });
    ProjectSettings.fromJson = function (obj) {
        var ret = new ProjectSettings();
        ret.DatabaseConnections = obj.DatabaseConnections;
        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputPaths = obj.OutputPaths;
        ret.RemotePackageLocation = obj.RemotePackageLocation;
        return ret;
    };
    ProjectSettings.prototype.toJson = function () {
        return {
            DatabaseConnections: this.DatabaseConnections,
            FileConnections: this.FileConnections,
            HttpConnections: this.HttpConnections,
            LocalPackageFolder: this.LocalPackageFolder,
            OutputPaths: this.OutputPaths,
            RemotePackageLocation: this.RemotePackageLocation,
        };
    };
    ProjectSettings.toJson = function (obj) {
        return {
            DatabaseConnections: obj.DatabaseConnections,
            FileConnections: obj.FileConnections,
            HttpConnections: obj.HttpConnections,
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputPaths: obj.OutputPaths,
            RemotePackageLocation: obj.RemotePackageLocation,
        };
    };
    return ProjectSettings;
}());
exports.ProjectSettings = ProjectSettings;
