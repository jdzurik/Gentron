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
var FileSource_1;
const _1 = require("./");
const converters_1 = require("./converters");
const ta_json_1 = require("ta-json");
const SourceBase_1 = require("./SourceBase");
let FileSource = FileSource_1 = class FileSource extends SourceBase_1.default {
    constructor() {
        super();
        this.DataFile = new _1.File();
    }
    clone() {
        const ret = new FileSource_1();
        ret._id = this._id;
        ret.DataFile = this.DataFile.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        return ret;
    }
    onDeserialized() {
        this.Result = {
            Json: "",
            Object: null,
            Xml: ""
        };
        if (_1.Utilities.hasObjectValue(this.DataFile)
            && _1.Utilities.hasStringValue(this.DataFile.Path)
            && _1.Utilities.hasStringValue(this.DataFile.Contents)) {
            try {
                const parsed = JSON.parse(this.DataFile.Contents);
                this.Result = {
                    Json: JSON.stringify(parsed, null, 4),
                    Object: parsed,
                    Xml: ""
                };
            }
            catch (_a) { }
        }
    }
    update(fileSource) {
        if (!_1.Utilities.hasValue(fileSource)) {
            return;
        }
        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
        this.DataFile.update(fileSource.DataFile);
        if (this.DataFile.Contents) {
            try {
                this.Result.Json = this.DataFile.Contents;
                this.Result.Object = JSON.parse(this.Result.Json);
            }
            catch (e) {
                this.Result = {
                    Json: "", Object: null, Xml: ""
                };
            }
        }
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonType(_1.File),
    ta_json_1.JsonConverter(converters_1.FileJsonConverter),
    __metadata("design:type", _1.File)
], FileSource.prototype, "DataFile", void 0);
__decorate([
    ta_json_1.OnDeserialized(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileSource.prototype, "onDeserialized", null);
FileSource = FileSource_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], FileSource);
exports.default = FileSource;
//# sourceMappingURL=FileSource.js.map