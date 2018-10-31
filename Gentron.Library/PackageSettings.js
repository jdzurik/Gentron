"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class PackageSettings extends abstract_1.JsonSerializable {
    get DatabaseSources() {
        return this._databaseSources;
    }
    set DatabaseSources(value) {
        this._databaseSources = value;
    }
    get Engines() {
        return this._engines;
    }
    set Engines(value) {
        this._engines = value;
    }
    get Environments() {
        return this._environments;
    }
    set Environments(value) {
        this._environments = value;
    }
    get FileSources() {
        return this._fileSources;
    }
    set FileSources(value) {
        this._fileSources = value;
    }
    get HttpSources() {
        return this._httpSources;
    }
    set HttpSources(value) {
        this._httpSources = value;
    }
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
        super();
        this._databaseSources = [];
        this._engines = [];
        this._environments = [];
        this._fileSources = [];
        this._httpSources = [];
        this._packageName = "";
        this._readMeText = "";
    }
    static fromJson(obj) {
        const ret = new PackageSettings();
        ret.DatabaseSources = obj.DatabaseSources;
        ret.Engines = obj.Engines;
        ret.Environments = obj.Environments;
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
            Environments: this.Environments,
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
            Environments: obj.Environments,
            FileSources: obj.FileSources,
            HttpSources: obj.HttpSources,
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    }
}
exports.PackageSettings = PackageSettings;
