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
var ConnectionGroup_1;
const abstract_1 = require("./abstract");
const _1 = require("./");
const ta_json_1 = require("ta-json");
const Utilities_1 = require("./Utilities");
let ConnectionGroup = ConnectionGroup_1 = class ConnectionGroup extends abstract_1.Cloneable {
    constructor() {
        super();
        this.Connections = [];
        this.Name = "";
    }
    addOrUpdateConnection(connection) {
        this.Connections.push(connection);
    }
    removeConnection(connection) {
    }
    clone() {
        const ret = new ConnectionGroup_1();
        ret._id = this._id;
        ret.Connections = this.Connections.map((conn, i) => {
            return conn.clone();
        });
        ret.Name = this.Name;
        return ret;
    }
    update(connectionGroup) {
        if (!Utilities_1.default.hasValue(connectionGroup)) {
            return;
        }
        this.Connections = connectionGroup.Connections.map((conn, i) => {
            return conn.clone();
        });
        this.Name = connectionGroup.Name;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.DatabaseConnection),
    __metadata("design:type", Array)
], ConnectionGroup.prototype, "Connections", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], ConnectionGroup.prototype, "Name", void 0);
ConnectionGroup = ConnectionGroup_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], ConnectionGroup);
exports.default = ConnectionGroup;
//# sourceMappingURL=ConnectionGroup.js.map