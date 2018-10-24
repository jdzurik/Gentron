"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageSettings = (function () {
    function PackageSettings() {
        this._packageName = "";
        this._readMeText = "";
        this.DatabaseSources = [];
        this.Engines = [];
        this.FileSources = [];
        this.HttpSources = [];
    }
    Object.defineProperty(PackageSettings.prototype, "PackageName", {
        get: function () {
            return this._packageName;
        },
        set: function (value) {
            this._packageName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageSettings.prototype, "ReadMeText", {
        get: function () {
            return this._readMeText;
        },
        set: function (value) {
            this._readMeText = value;
        },
        enumerable: true,
        configurable: true
    });
    PackageSettings.fromJson = function (obj) {
        var ret = new PackageSettings();
        ret.DatabaseSources = obj.DatabaseSources;
        ret.Engines = obj.Engines;
        ret.FileSources = obj.FileSources;
        ret.HttpSources = obj.HttpSources;
        ret.PackageName = obj.PackageName;
        ret.ReadMeText = obj.ReadMeText;
        return ret;
    };
    PackageSettings.prototype.toJson = function () {
        return {
            DatabaseSources: this.DatabaseSources,
            Engines: this.Engines,
            FileSources: this.FileSources,
            HttpSources: this.HttpSources,
            PackageName: this.PackageName,
            ReadMeText: this.ReadMeText
        };
    };
    PackageSettings.toJson = function (obj) {
        return {
            DatabaseSources: obj.DatabaseSources,
            Engines: obj.Engines,
            FileSources: obj.FileSources,
            HttpSources: obj.HttpSources,
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    };
    return PackageSettings;
}());
exports.PackageSettings = PackageSettings;
