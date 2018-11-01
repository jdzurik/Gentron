"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class ConnectionGroup extends abstract_1.Cloneable {
    constructor() {
        super();
        this._connections = [];
        this._name = "";
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
    clone() {
        const ret = new ConnectionGroup();
        ret._cloneId = this.ID;
        ret._connections = this._connections.map((conn, i) => conn.clone());
        ret._isClone = true;
        ret._name = this._name;
        return ret;
    }
    update(connection) {
        this._connections = connection.Connections.map((conn, i) => conn.clone());
        this._name = connection.Name;
    }
}
exports.ConnectionGroup = ConnectionGroup;
