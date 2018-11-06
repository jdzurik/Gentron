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
var DatabaseSource_1;
const _1 = require("./");
const SourceBase_1 = require("./SourceBase");
const ta_json_1 = require("ta-json");
let DatabaseSource = DatabaseSource_1 = class DatabaseSource extends SourceBase_1.SourceBase {
    constructor() {
        super();
        this.ActiveConnectionGroup = new _1.ConnectionGroup();
        this.Script = new _1.File();
    }
    clone() {
        const ret = new DatabaseSource_1();
        ret._id = this._id;
        ret.ActiveConnectionGroup = this.ActiveConnectionGroup.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Script = this.Script;
        return ret;
    }
    update(databaseSource) {
        if (typeof (databaseSource) === typeof (undefined) || databaseSource === null) {
            return;
        }
        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;
        this.Script.update(databaseSource.Script);
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.ConnectionGroup),
    __metadata("design:type", Object)
], DatabaseSource.prototype, "ActiveConnectionGroup", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Object)
], DatabaseSource.prototype, "Script", void 0);
DatabaseSource = DatabaseSource_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], DatabaseSource);
exports.DatabaseSource = DatabaseSource;
//# sourceMappingURL=DatabaseSource.js.map