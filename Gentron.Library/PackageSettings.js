"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PackageSettings {
    get PackageName() {
        return this._packageName;
    }
    set PackageName(value) {
        this._packageName = value;
    }
    get ReadMeText() {
        return this._readMeText;
    }
    set ReadMeText(value) {
        this._readMeText = value;
    }
    constructor() {
        this._packageName = "";
        this._readMeText = "";
        this.DatabaseSources = [];
        this.Engines = [];
        this.FileSources = [];
        this.HttpSources = [];
    }
    static fromJson(obj) {
        const ret = new PackageSettings();
        ret.DatabaseSources = obj.DatabaseSources;
        ret.Engines = obj.Engines;
        ret.FileSources = obj.FileSources;
        ret.HttpSources = obj.HttpSources;
        ret.PackageName = obj.PackageName;
        ret.ReadMeText = obj.ReadMeText;
        return ret;
    }
    toJson() {
        return {
            DatabaseSources: this.DatabaseSources,
            Engines: this.Engines,
            FileSources: this.FileSources,
            HttpSources: this.HttpSources,
            PackageName: this.PackageName,
            ReadMeText: this.ReadMeText
        };
    }
    static toJson(obj) {
        return {
            DatabaseSources: obj.DatabaseSources,
            Engines: obj.Engines,
            FileSources: obj.FileSources,
            HttpSources: obj.HttpSources,
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    }
}
exports.PackageSettings = PackageSettings;
