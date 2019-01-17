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
const ta_json_1 = require("ta-json");
const __1 = require("../");
let Identifiable = class Identifiable {
    constructor() {
        this._id = __1.Utilities.newCryptoGuid();
    }
    get ID() {
        return this._id;
    }
};
__decorate([
    ta_json_1.JsonProperty("ID"),
    __metadata("design:type", String)
], Identifiable.prototype, "_id", void 0);
Identifiable = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Identifiable);
exports.default = Identifiable;
//# sourceMappingURL=Identifiable.js.map