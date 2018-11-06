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
var Environment_1;
const abstract_1 = require("./abstract");
const ta_json_1 = require("ta-json");
let Environment = Environment_1 = class Environment extends abstract_1.Cloneable {
    constructor() {
        super();
        this.IsActive = false;
        this.Name = "";
    }
    clone() {
        const ret = new Environment_1();
        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        return ret;
    }
    update(environment) {
        this.IsActive = environment.IsActive;
        this.Name = environment.Name;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Boolean)
], Environment.prototype, "IsActive", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], Environment.prototype, "Name", void 0);
Environment = Environment_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Environment);
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map