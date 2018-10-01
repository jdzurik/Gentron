"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionBase = (function () {
    function ConnectionBase() {
        this._isActive = true;
    }
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
