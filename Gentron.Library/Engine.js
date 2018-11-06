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
var Engine_1;
const SourceBase_1 = require("./SourceBase");
const Template_1 = require("./Template");
const ta_json_1 = require("ta-json");
let Engine = Engine_1 = class Engine extends SourceBase_1.SourceBase {
    constructor() {
        super();
        this.Templates = [];
    }
    clone() {
        const ret = new Engine_1();
        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Templates = this.Templates.map((template, index) => {
            return template.clone();
        });
        return ret;
    }
    update(engine) {
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonType(Template_1.Template),
    __metadata("design:type", Array)
], Engine.prototype, "Templates", void 0);
Engine = Engine_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Engine);
exports.Engine = Engine;
//# sourceMappingURL=Engine.js.map