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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const ta_json_1 = require("ta-json");
let PackageSettings = class PackageSettings {
    constructor() {
        this.DatabaseSources = [];
        this.Engines = [];
        this.FileSources = [];
        this.HttpSources = [];
        this.PackageName = '';
        this.ReadMe = '';
    }
    buildDataSourceResults() {
        let ret = {};
        const buildSourceResults = (builder, sources) => {
            for (let i = 0; i < sources.length; ++i) {
                if (!sources[i].IsActive) {
                    continue;
                }
                const source = sources[i];
                if (_1.ObjectUtils.hasObjectValue(source.Result) && _1.ObjectUtils.hasObjectValue(source.Result.Object)) {
                    builder[source.Name] = source.Result.Object;
                }
            }
        };
        buildSourceResults(ret, this.DatabaseSources);
        buildSourceResults(ret, this.FileSources);
        buildSourceResults(ret, this.HttpSources);
        return ret;
    }
    mergeResults(packageSettingsJson) {
        if (!_1.ObjectUtils.hasObjectValue(packageSettingsJson)) {
            return;
        }
        const mergeSourceResults = (thisSources, thatSources) => {
            if (_1.ObjectUtils.hasObjectValue(thisSources) && _1.ObjectUtils.hasObjectValue(thatSources)) {
                for (let i = 0; i < thisSources.length; ++i) {
                    const thisSource = thisSources[i];
                    for (let j = 0; j < thatSources.length; ++j) {
                        const thatSource = thatSources[j];
                        if (thisSource.ID === thatSource.ID) {
                            if (!_1.ObjectUtils.hasObjectValue(thisSource.Result) && _1.ObjectUtils.hasObjectValue(thatSource.Result)) {
                                thisSource.Result = thatSource.Result;
                            }
                        }
                    }
                }
            }
        };
        mergeSourceResults(this.DatabaseSources, packageSettingsJson.DatabaseSources);
        mergeSourceResults(this.FileSources, packageSettingsJson.FileSources);
        mergeSourceResults(this.HttpSources, packageSettingsJson.HttpSources);
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.DatabaseSource),
    __metadata("design:type", Array)
], PackageSettings.prototype, "DatabaseSources", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.Engine),
    __metadata("design:type", Array)
], PackageSettings.prototype, "Engines", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.FileSource),
    __metadata("design:type", Array)
], PackageSettings.prototype, "FileSources", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.HttpSource),
    __metadata("design:type", Array)
], PackageSettings.prototype, "HttpSources", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], PackageSettings.prototype, "PackageName", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], PackageSettings.prototype, "ReadMe", void 0);
PackageSettings = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], PackageSettings);
exports.default = PackageSettings;
//# sourceMappingURL=PackageSettings.js.map