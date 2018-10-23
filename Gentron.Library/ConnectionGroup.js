"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid_1 = require("./utils/Guid");
var ConnectionGroup = (function () {
    function ConnectionGroup() {
        this._id = Guid_1.default.newCryptoGuid();
        this._connections = [];
        this._name = "";
    }
    Object.defineProperty(ConnectionGroup.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionGroup.prototype, "Connections", {
        get: function () {
            return (this._connections || []).slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionGroup.prototype, "Name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    ConnectionGroup.prototype.addOrUpdateConnection = function (connection) {
        this._connections.push(connection);
    };
    ConnectionGroup.prototype.removeConnection = function (connection) {
    };
    ConnectionGroup.prototype.toJson = function () {
    };
    ConnectionGroup.prototype.update = function (connection) {
        for (var i = 0; i < this.Connections.length; ++i) {
            for (var j = 0; j < connection.Connections.length; ++j) {
                if (this.Connections[i].ID === connection.Connections[j].ID) {
                    this.Connections[i].update(connection.Connections[j]);
                }
            }
        }
    };
    return ConnectionGroup;
}());
exports.ConnectionGroup = ConnectionGroup;
