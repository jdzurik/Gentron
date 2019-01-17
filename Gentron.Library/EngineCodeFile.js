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
var EngineCodeFile_1;
const ta_json_1 = require("ta-json");
const _1 = require("./");
let EngineCodeFile = EngineCodeFile_1 = class EngineCodeFile extends _1.File {
    constructor() {
        super();
        this.IncludeConsole = false;
        this.IncludeDirname = false;
        this.IncludeFilename = false;
        this.IncludeRequires = false;
        this.ModifiedContents = '';
        this.PackageList = [];
    }
    clone() {
        const ret = new EngineCodeFile_1();
        ret._id = this._id;
        ret.Contents = this.Contents;
        ret.LastModified = this.LastModified;
        ret.Path = this.Path;
        ret.IncludeConsole = this.IncludeConsole;
        ret.IncludeDirname = this.IncludeDirname;
        ret.IncludeFilename = this.IncludeFilename;
        ret.IncludeRequires = this.IncludeRequires;
        ret.PackageList = this.PackageList.map((module, index, arr) => {
            return Object.assign({}, module);
        });
        return ret;
    }
    resolveModulesRelativePaths(dirname, localPackageFolder) {
        if (!_1.ObjectUtils.hasValue(this.PackageList) || !_1.ObjectUtils.isArray(this.PackageList) || this.PackageList.length === 0) {
            return;
        }
        for (let i = 0; i < this.PackageList.length; ++i) {
            _1.VMUtils.resolveModuleRelativePath(dirname, localPackageFolder, this.PackageList[i]);
            this.ModifiedContents = _1.VMUtils.rewriteModuleRequires(this.PackageList, this.Contents);
        }
    }
    toModuleListOptions() {
        return {
            IncludeConsole: this.IncludeConsole,
            IncludeDirname: this.IncludeDirname,
            IncludeFilename: this.IncludeFilename,
            IncludeRequires: this.IncludeRequires,
            PackageList: this.PackageList
        };
    }
    update(codeEngineFile) {
        super.update(codeEngineFile);
        const moduleList = _1.VMUtils.getDependenciesFromModuleSource(this.Contents);
        this.IncludeConsole = moduleList.IncludeConsole;
        this.IncludeDirname = moduleList.IncludeDirname;
        this.IncludeFilename = moduleList.IncludeFilename;
        this.IncludeRequires = moduleList.IncludeRequires;
        this.PackageList = moduleList.PackageList;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], EngineCodeFile.prototype, "IncludeConsole", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], EngineCodeFile.prototype, "IncludeDirname", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], EngineCodeFile.prototype, "IncludeFilename", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], EngineCodeFile.prototype, "IncludeRequires", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Array)
], EngineCodeFile.prototype, "PackageList", void 0);
EngineCodeFile = EngineCodeFile_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], EngineCodeFile);
exports.default = EngineCodeFile;
//# sourceMappingURL=EngineCodeFile.js.map