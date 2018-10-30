"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class ConnectionGroup {
    constructor() {
        this._id = _1.Utilities.newCryptoGuid();
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
    clone() {
        const ret = new ConnectionGroup();
        ret._connections = this._connections.map((conn, i) => conn.clone());
        ret._id = this._id;
        ret._name = this._name;
        return ret;
    }
    update(connection) {
        this._connections = connection.Connections.map((conn, i) => conn.clone());
        this._name = connection.Name;
    }
}
exports.ConnectionGroup = ConnectionGroup;
