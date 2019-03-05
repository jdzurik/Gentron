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
var SourceDriverFile_1;
const ta_json_1 = require("ta-json");
const _1 = require("./");
let SourceDriverFile = SourceDriverFile_1 = class SourceDriverFile extends _1.File {
    constructor() {
        super();
        this.IncludeDirname = false;
        this.IncludeFilename = false;
        this.IncludeRequires = false;
        this.ModifiedContents = '';
        this.PackageList = [];
    }
    clone() {
        const ret = new SourceDriverFile_1();
        ret._id = this._id;
        ret.Contents = this.Contents;
        ret.LastModified = this.LastModified;
        ret.Path = this.Path;
        ret.IncludeDirname = this.IncludeDirname;
        ret.IncludeFilename = this.IncludeFilename;
        ret.IncludeRequires = this.IncludeRequires;
        ret.PackageList = this.PackageList.map((module, index, arr) => {
            return Object.assign({}, module);
        });
        return ret;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], SourceDriverFile.prototype, "IncludeDirname", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], SourceDriverFile.prototype, "IncludeFilename", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], SourceDriverFile.prototype, "IncludeRequires", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Array)
], SourceDriverFile.prototype, "PackageList", void 0);
SourceDriverFile = SourceDriverFile_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], SourceDriverFile);
exports.default = SourceDriverFile;
//# sourceMappingURL=SourceDriverFile.js.map