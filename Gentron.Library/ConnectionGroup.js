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
const ConnectionBase_1 = require("./ConnectionBase");
const abstract_1 = require("./abstract");
const ta_json_1 = require("ta-json");
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
    update(connection) {
        this.Connections = connection.Connections.map((conn, i) => {
            return conn.clone();
        });
        this.Name = connection.Name;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(ConnectionBase_1.ConnectionBase),
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
exports.ConnectionGroup = ConnectionGroup;
//# sourceMappingURL=ConnectionGroup.js.map