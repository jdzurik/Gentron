"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class ConnectionGroup extends abstract_1.Cloneable {
    constructor(genericConnectionConstructor) {
        super();
        this._connections = [];
        this._genericConnectionConstructor = genericConnectionConstructor;
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
    fromJson(json) {
        this._connections = json.Connections.map((connection, index) => {
            return this._genericConnectionConstructor().fromJson(connection);
        });
        this._id = json.ID;
        this._name = json.Name;
        return this;
    }
    toJson() {
        return {
            Connections: this._connections.map((connection, index) => {
                return connection.toJson();
            }),
            ID: this._id,
            Name: this._name
        };
    }
    clone() {
        const ret = new ConnectionGroup(this._genericConnectionConstructor);
        ret._connections = this._connections.map((conn, i) => {
            return conn.clone();
        });
        ret._id = this._id;
        ret._name = this._name;
        return ret;
    }
    update(connection) {
        this._connections = connection.Connections.map((conn, i) => {
            return conn.clone();
        });
        this._name = connection.Name;
    }
}
exports.ConnectionGroup = ConnectionGroup;
