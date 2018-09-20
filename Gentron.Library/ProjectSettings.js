"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectSettings = (function () {
    function ProjectSettings() {
    }
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
    ProjectSettings.fromJson = function (jsonStr) {
        return JSON.parse(jsonStr);
    };
    ProjectSettings.toJson = function (obj) {
        return JSON.stringify(obj);
    };
    return ProjectSettings;
}());
exports.ProjectSettings = ProjectSettings;
