"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionGroup = (function () {
    function ConnectionGroup() {
        this._connections = [];
        this._name = "";
    }
    Object.defineProperty(ConnectionGroup.prototype, "Connections", {
        get: function () {
            return this._connections;
        },
        set: function (value) {
            this._connections = value;
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
    };
    ConnectionGroup.prototype.removeConnection = function (connection) {
    };
    return ConnectionGroup;
}());
exports.ConnectionGroup = ConnectionGroup;
