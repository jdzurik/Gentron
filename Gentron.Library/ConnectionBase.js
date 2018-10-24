"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid_1 = require("./utils/Guid");
var ConnectionBase = (function () {
    function ConnectionBase() {
        this._id = Guid_1.default.newCryptoGuid();
        this._isActive = true;
    }
    Object.defineProperty(ConnectionBase.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionBase.prototype, "IsActive", {
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    return ConnectionBase;
}());
exports.ConnectionBase = ConnectionBase;
