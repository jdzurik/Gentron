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
var OutputPath_1;
const abstract_1 = require("./abstract");
const ta_json_1 = require("ta-json");
let OutputPath = OutputPath_1 = class OutputPath extends abstract_1.Cloneable {
    constructor() {
        super();
        this.Environment = "";
        this.Path = "";
    }
    clone() {
        const ret = new OutputPath_1();
        ret._id = this._id;
        ret.Environment = this.Environment;
        ret.Path = this.Path;
        return ret;
    }
    update(ouputPath) {
        this.Environment = ouputPath.Environment;
        this.Path = ouputPath.Path;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], OutputPath.prototype, "Environment", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], OutputPath.prototype, "Path", void 0);
OutputPath = OutputPath_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], OutputPath);
exports.OutputPath = OutputPath;
//# sourceMappingURL=OutputPath.js.map