"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectSettings = (function () {
    function ProjectSettings() {
        this._databaseConnections = [];
        this._fileConnections = [];
        this._httpConnections = [];
        this._localPackageFolder = "";
        this._outputCodeFolder = "";
        this._remotePackageLocation = "";
    }
    Object.defineProperty(ProjectSettings.prototype, "DatabaseConnections", {
        get: function () {
            return this._databaseConnections;
        },
        set: function (value) {
            this._databaseConnections = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(ProjectSettings.prototype, "OutputCodeFolder", {
        get: function () {
            return this._outputCodeFolder;
        },
        set: function (value) {
            this._outputCodeFolder = value;
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
        ret.LocalPackageFolder = obj.LocalPackageFolder;
        ret.OutputCodeFolder = obj.OutputCodeFolder;
        ret.RemotePackageLocation = obj.RemotePackageLocation;
        return ret;
    };
    ProjectSettings.toJson = function (obj) {
        return {
            LocalPackageFolder: obj.LocalPackageFolder,
            OutputCodeFolder: obj.OutputCodeFolder,
            RemotePackageLocation: obj.RemotePackageLocation
        };
    };
    return ProjectSettings;
}());
exports.ProjectSettings = ProjectSettings;
