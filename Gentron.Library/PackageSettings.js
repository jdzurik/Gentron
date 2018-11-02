"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
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
    get ReadMe() {
        return this._readMe;
    }
    set ReadMe(value) {
        this._readMe = value;
    }
    constructor() {
        this._databaseSources = [];
        this._engines = [];
        this._environments = [];
        this._fileSources = [];
        this._httpSources = [];
        this._packageName = "";
        this._readMe = "";
    }
    fromJson(json) {
        this._databaseSources = json.DatabaseSources.map((source, index) => {
            return new _1.DatabaseSource().fromJson(source);
        });
        this._engines = json.Engines.map((source, index) => {
            return new _1.Engine().fromJson(source);
        });
        this._environments = json.Environments.map((source, index) => {
            return new _1.Environment().fromJson(source);
        });
        this._fileSources = json.FileSources.map((source, index) => {
            return new _1.FileSource().fromJson(source);
        });
        this._httpSources = json.HttpSources.map((source, index) => {
            return new _1.HttpSource().fromJson(source);
        });
        this._packageName = json.PackageName;
        this._readMe = json.ReadMe;
        return this;
    }
    toJson() {
        return {
            DatabaseSources: this._databaseSources.map((source, index) => {
                return source.toJson();
            }),
            Engines: this._engines.map((source, index) => {
                return source.toJson();
            }),
            Environments: this._environments.map((source, index) => {
                return source.toJson();
            }),
            FileSources: this._fileSources.map((source, index) => {
                return source.toJson();
            }),
            HttpSources: this._httpSources.map((source, index) => {
                return source.toJson();
            }),
            PackageName: this._packageName,
            ReadMe: this._readMe
        };
    }
}
exports.PackageSettings = PackageSettings;
