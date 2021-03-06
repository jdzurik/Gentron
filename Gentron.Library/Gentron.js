"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron_1;
const path = require("path");
const _1 = require("./");
const constants_1 = require("./constants");
const ta_json_1 = require("ta-json");
const results_1 = require("./results");
let Gentron = Gentron_1 = class Gentron {
    constructor() {
        this.ActiveProjectPath = '';
        this.ProjectSettings = new _1.ProjectSettings();
        this.PackageSettings = new _1.PackageSettings(this.ProjectSettings);
    }
    static deserialize(gentron) {
        return _1.SerializationUtils.TaJson.deserialize({
            ActiveProjectPath: gentron.ActiveProjectPath,
            PackageSettings: gentron.PackageSettings,
            ProjectSettings: gentron.ProjectSettings
        }, Gentron_1);
    }
    static parse(gentronJson) {
        return _1.SerializationUtils.TaJson.parse(gentronJson, Gentron_1);
    }
    static save(iGentron) {
        const gentron = this.deserialize(iGentron);
        const packageSettings = gentron.PackageSettings;
        const projectSettings = gentron.ProjectSettings;
        let infoMessage = '';
        const projectSettingsDirectory = path.dirname(iGentron.ActiveProjectPath);
        const localPackageFolderExists = _1.ObjectUtils.hasStringValue(projectSettings.LocalPackageFolder);
        const packageNameExists = _1.ObjectUtils.hasStringValue(packageSettings.PackageName);
        if (!localPackageFolderExists && !packageNameExists) {
            infoMessage = constants_1.InfoMessages.PACKAGE_FOLDER_AND_NAME_NULL;
            projectSettings.LocalPackageFolder = projectSettingsDirectory
                + path.sep + constants_1.Gentron.DEFAULT_LOCAL_PACKAGE_FOLDER;
        }
        else if (!localPackageFolderExists && packageNameExists) {
            infoMessage = constants_1.InfoMessages.PACKAGE_LOCAL_FOLDER_NULL;
            projectSettings.LocalPackageFolder = projectSettingsDirectory
                + path.sep + packageSettings.PackageName;
        }
        const projectSettingsStr = JSON.stringify(_1.SerializationUtils.TaJson.serialize(projectSettings), null, 4);
        const projectSaveResult = _1.File.write(iGentron.ActiveProjectPath, projectSettingsStr);
        if (projectSaveResult.IsError) {
            return results_1.Result.fail(projectSaveResult.ErrorMessage);
        }
        const packageSettingsStr = JSON.stringify(_1.SerializationUtils.TaJson.serialize(packageSettings), null, 4);
        const packageFilePath = projectSettings.LocalPackageFolder
            + path.sep + constants_1.Gentron.DEFAULT_PACKAGE_NAME;
        const packageSaveResult = _1.File.write(packageFilePath, packageSettingsStr, true);
        if (packageSaveResult.IsError) {
            return results_1.Result.fail(packageSaveResult.ErrorMessage);
        }
        return results_1.Result.ok({ InfoMessage: infoMessage });
    }
    static open(fileName) {
        const ret = new Gentron_1();
        ret.ActiveProjectPath = fileName;
        const projectReadResult = _1.File.read(fileName);
        if (projectReadResult.IsError) {
            return results_1.Result.fail(projectReadResult.ErrorMessage);
        }
        try {
            ret.ProjectSettings = _1.SerializationUtils.TaJson.parse(projectReadResult.Result, _1.ProjectSettings);
        }
        catch (e) {
            return results_1.Result.fail(e.message);
        }
        if (!_1.ObjectUtils.hasStringValue(ret.ProjectSettings.LocalPackageFolder)) {
            return results_1.Result.ok({ Gentron: ret, InfoMessage: constants_1.InfoMessages.LOCAL_PACKAGE_FOLDER_NOT_FOUND });
        }
        const packageFilePath = ret.ProjectSettings.LocalPackageFolder
            + path.sep + constants_1.Gentron.DEFAULT_PACKAGE_NAME;
        const packageReadResult = _1.File.read(packageFilePath);
        if (packageReadResult.IsError) {
            return results_1.Result.fail(packageReadResult.ErrorMessage);
        }
        try {
            ret.PackageSettings = _1.SerializationUtils.TaJson.parse(packageReadResult.Result, _1.PackageSettings);
            ret.PackageSettings.DatabaseSources.forEach((source, index) => {
            });
            ret.PackageSettings.Engines.forEach((source, index) => {
            });
        }
        catch (e) {
            return results_1.Result.fail(e.message);
        }
        return results_1.Result.ok({ Gentron: ret });
    }
    Run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(' Start Run ...');
            console.log(this.PackageSettings.DatabaseSources);
            this.PackageSettings.DatabaseSources.forEach(DbSource => {
                console.log(DbSource.Name + ' Start.');
                DbSource.executeScript().then(() => {
                    console.log(DbSource.Name + ' Data Loaded.');
                    this.StartEngines();
                })
                    .catch((err) => {
                    console.log('DB Source load error: ' + err.toString());
                });
            });
        });
    }
    StartEngines() {
        let dataResult = '';
        dataResult = this.PackageSettings.buildDataSourceResults();
        console.log(dataResult);
        this.PackageSettings.Engines.forEach(engine => {
            engine.run(this.ProjectSettings.LocalPackageFolder, dataResult, (outputData) => {
                if (outputData) {
                    console.log('Engine: ' + engine.Name + ' error');
                }
                else {
                    console.log('Engine: ' + engine.Name + ' Complete');
                }
            });
        });
        console.log(' End Run.');
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], Gentron.prototype, "ActiveProjectPath", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.PackageSettings),
    __metadata("design:type", _1.PackageSettings)
], Gentron.prototype, "PackageSettings", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.ProjectSettings),
    __metadata("design:type", _1.ProjectSettings)
], Gentron.prototype, "ProjectSettings", void 0);
Gentron = Gentron_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Gentron);
exports.Gentron = Gentron;
//# sourceMappingURL=Gentron.js.map