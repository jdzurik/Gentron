"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PackageSettings {
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
        this._databaseSources = [];
        this._engines = [];
        this._environments = [];
        this._fileSources = [];
        this._httpSources = [];
        this._packageName = "";
        this._readMeText = "";
    }
    toJson() {
        return {
            DatabaseSources: this._databaseSources.map((source, index) => source.toJson()),
            Engines: this._engines.map((source, index) => source.toJson()),
            Environments: this._environments.map((source, index) => source.toJson()),
            FileSources: this._fileSources.map((source, index) => source.toJson()),
            HttpSources: this._httpSources.map((source, index) => source.toJson()),
            PackageName: this._packageName,
            ReadMeText: this._readMeText
        };
    }
}
exports.PackageSettings = PackageSettings;
