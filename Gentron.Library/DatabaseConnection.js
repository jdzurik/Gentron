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
var DatabaseConnection_1;
const ta_json_1 = require("ta-json");
const _1 = require(".");
const ConnectionBase_1 = require("./ConnectionBase");
let DatabaseConnection = DatabaseConnection_1 = class DatabaseConnection extends ConnectionBase_1.default {
    constructor() {
        super();
        this.ConnectionString = '';
        this.Environment = '';
    }
    clone() {
        const ret = new DatabaseConnection_1();
        ret._id = this._id;
        ret.ConnectionString = this.ConnectionString;
        ret.Environment = this.Environment;
        ret.IsActive = this.IsActive;
        return ret;
    }
    update(connection) {
        if (!_1.ObjectUtils.hasValue(connection)) {
            return;
        }
        this.ConnectionString = connection.ConnectionString;
        this.Environment = connection.Environment;
        this.IsActive = connection.IsActive;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], DatabaseConnection.prototype, "ConnectionString", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], DatabaseConnection.prototype, "Environment", void 0);
DatabaseConnection = DatabaseConnection_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], DatabaseConnection);
exports.default = DatabaseConnection;
//# sourceMappingURL=DatabaseConnection.js.map