"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid_1 = require("./utils/Guid");
var PackageSettings_1 = require("./PackageSettings");
var ProjectSettings_1 = require("./ProjectSettings");
var Gentron = (function () {
    function Gentron(id) {
        this._id = id || Guid_1.default.newCryptoGuid();
        this._packageSettings = new PackageSettings_1.PackageSettings();
        this._projectSettings = new ProjectSettings_1.ProjectSettings();
    }
    Object.defineProperty(Gentron.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gentron.prototype, "PackageSettings", {
        get: function () {
            return this._packageSettings;
        },
        set: function (value) {
            this._packageSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gentron.prototype, "ProjectSettings", {
        get: function () {
            return this._projectSettings;
        },
        set: function (value) {
            this._projectSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Gentron.fromJson = function (obj) {
        var ret = new Gentron(obj.ID);
        ret.PackageSettings = PackageSettings_1.PackageSettings.fromJson(obj.PackageSettings);
        ret.ProjectSettings = ProjectSettings_1.ProjectSettings.fromJson(obj.ProjectSettings);
        return ret;
    };
    Gentron.prototype.toJson = function () {
        return {
            ID: this.ID,
            PackageSettings: this.PackageSettings.toJson(),
            ProjectSettings: this.ProjectSettings.toJson(),
        };
    };
    Gentron.toJson = function (obj) {
        return {
            ID: obj.ID,
            PackageSettings: PackageSettings_1.PackageSettings.toJson(obj.PackageSettings),
            ProjectSettings: ProjectSettings_1.ProjectSettings.toJson(obj.ProjectSettings),
        };
    };
    Gentron.save = function () {
    };
    Gentron.saveAs = function () {
    };
    Gentron.open = function () {
    };
    return Gentron;
}());
exports.Gentron = Gentron;
