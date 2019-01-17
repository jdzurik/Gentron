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
var Template_1;
const abstract_1 = require("./abstract");
const ta_json_1 = require("ta-json");
const _1 = require("./");
const converters_1 = require("./converters");
var TemplateTypes;
(function (TemplateTypes) {
    TemplateTypes[TemplateTypes["Partial"] = 0] = "Partial";
    TemplateTypes[TemplateTypes["Primary"] = 1] = "Primary";
})(TemplateTypes || (TemplateTypes = {}));
let Template = Template_1 = class Template extends abstract_1.Cloneable {
    constructor() {
        super();
        this.Name = "";
        this.TemplateCode = new _1.File();
        this.Type = TemplateTypes.Partial;
    }
    clone() {
        const ret = new Template_1();
        ret._id = this._id;
        ret.Name = this.Name;
        ret.TemplateCode = this.TemplateCode.clone();
        ret.Type = this.Type;
        return ret;
    }
    update(template) {
        if (!_1.Utilities.hasValue(template)) {
            return;
        }
        this.Name = template.Name;
        this.TemplateCode.update(template.TemplateCode);
        this.Type = template.Type;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], Template.prototype, "Name", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonType(_1.File),
    ta_json_1.JsonConverter(converters_1.FileJsonConverter),
    __metadata("design:type", _1.File)
], Template.prototype, "TemplateCode", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Number)
], Template.prototype, "Type", void 0);
Template = Template_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Template);
exports.default = Template;
//# sourceMappingURL=Template.js.map