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
var OutputPathGroup_1;
const abstract_1 = require("./abstract");
const _1 = require("./");
const ta_json_1 = require("ta-json");
let OutputPathGroup = OutputPathGroup_1 = class OutputPathGroup extends abstract_1.Cloneable {
    constructor() {
        super();
        this.Name = "";
        this.Paths = [];
    }
    addOrUpdatePath(connection) {
        this.Paths.push(connection);
    }
    removePath(connection) {
    }
    clone() {
        const ret = new OutputPathGroup_1();
        ret._id = this._id;
        ret.Name = this.Name;
        ret.Paths = this.Paths.map((conn, i) => {
            return conn.clone();
        });
        return ret;
    }
    update(connection) {
        this.Name = connection.Name;
        this.Paths = connection.Paths.map((conn, i) => {
            return conn.clone();
        });
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], OutputPathGroup.prototype, "Name", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.OutputPath),
    __metadata("design:type", Array)
], OutputPathGroup.prototype, "Paths", void 0);
OutputPathGroup = OutputPathGroup_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], OutputPathGroup);
exports.OutputPathGroup = OutputPathGroup;
//# sourceMappingURL=OutputPathGroup.js.map