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
let ProjectSettings = class ProjectSettings {
    constructor() {
        this.LocalPackageFolder = '';
        this.DatabaseConnectSettings = new Array();
        this.InputSourceDirectories = new Array();
        this.HttpConnectSettings = new Array();
        this.OutputDirectories = Array();
        this.RemotePackageLocation = new _1.HttpConnection();
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], ProjectSettings.prototype, "LocalPackageFolder", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.OutputPath),
    __metadata("design:type", Array)
], ProjectSettings.prototype, "OutputDirectories", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.DatabaseConnection),
    __metadata("design:type", Array)
], ProjectSettings.prototype, "DatabaseConnectSettings", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.FileConnection),
    __metadata("design:type", Array)
], ProjectSettings.prototype, "InputSourceDirectories", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.HttpConnection),
    __metadata("design:type", Array)
], ProjectSettings.prototype, "HttpConnectSettings", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", _1.HttpConnection)
], ProjectSettings.prototype, "RemotePackageLocation", void 0);
ProjectSettings = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], ProjectSettings);
exports.default = ProjectSettings;
//# sourceMappingURL=ProjectSettings.js.map