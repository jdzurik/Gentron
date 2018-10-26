"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guid_1 = require("./utils/Guid");
class ConnectionGroup {
    constructor() {
        this._id = Guid_1.default.newCryptoGuid();
        this._connections = [];
        this._name = "";
    }
    get ID() {
        return this._id;
    }
    get Connections() {
        return (this._connections || []).slice();
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
    addOrUpdateConnection(connection) {
        this._connections.push(connection);
    }
    removeConnection(connection) {
    }
    toJson() {
        throw new Error("Method not implemented");
    }
    update(connection) {
        for (let i = 0; i < this.Connections.length; ++i) {
            for (let j = 0; j < connection.Connections.length; ++j) {
                if (this.Connections[i].ID === connection.Connections[j].ID) {
                    this.Connections[i].update(connection.Connections[j]);
                }
            }
        }
    }
}
exports.ConnectionGroup = ConnectionGroup;
