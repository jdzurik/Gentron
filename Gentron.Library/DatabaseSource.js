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
var DatabaseSource_1;
const converters_1 = require("./converters");
const _1 = require("./");
const ta_json_1 = require("ta-json");
const SourceBase_1 = require("./SourceBase");
let DatabaseSource = DatabaseSource_1 = class DatabaseSource extends SourceBase_1.default {
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
        ret.Script = this.Script.clone();
        return ret;
    }
    executeScript() {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield DatabaseSource_1._msSqlQueryProvider.executeQuery(this.ActiveConnectionGroup.Connections[0].ConnectionString, this.Script.Contents, true);
            }
            catch (e) {
                result = yield DatabaseSource_1._msSqlQueryProvider.onExecuteQueryFail(this.Script.Contents, _1.ObjectUtils.getErrorMessage(e), true);
            }
            this.Result = result.Result;
        });
    }
    update(databaseSource) {
        if (!_1.ObjectUtils.hasValue(databaseSource)) {
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
    ta_json_1.JsonConverter(converters_1.ActiveConnectionGroupConverter),
    __metadata("design:type", _1.ConnectionGroup)
], DatabaseSource.prototype, "ActiveConnectionGroup", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonType(_1.File),
    ta_json_1.JsonConverter(converters_1.FileJsonConverter),
    __metadata("design:type", _1.File)
], DatabaseSource.prototype, "Script", void 0);
DatabaseSource = DatabaseSource_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], DatabaseSource);
exports.default = DatabaseSource;
//# sourceMappingURL=DatabaseSource.js.map