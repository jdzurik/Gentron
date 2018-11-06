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
const abstract_1 = require("./abstract");
let Gentron = class Gentron extends abstract_1.Cloneable {
    constructor() {
        super();
        this._id = _1.Utilities.newCryptoGuid();
        this.PackageSettings = new _1.PackageSettings();
        this.ProjectSettings = new _1.ProjectSettings();
    }
    get ID() {
        return this._id;
    }
    clone() {
        throw new Error("Method not implemented");
    }
    static save() {
    }
    static saveAs() {
    }
    static open() {
    }
};
__decorate([
    ta_json_1.JsonProperty("ID"),
    __metadata("design:type", String)
], Gentron.prototype, "_id", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(abstract_1.Cloneable),
    __metadata("design:type", Object)
], Gentron.prototype, "PackageSettings", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(abstract_1.Cloneable),
    __metadata("design:type", Object)
], Gentron.prototype, "ProjectSettings", void 0);
Gentron = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Gentron);
exports.Gentron = Gentron;
