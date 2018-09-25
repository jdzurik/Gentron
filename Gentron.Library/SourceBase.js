"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SourceBase = (function () {
    function SourceBase() {
    }
    Object.defineProperty(SourceBase.prototype, "IsActive", {
        get: function () {
            return this._isActive;
        },
        set: function (value) {
            this._isActive = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourceBase.prototype, "Name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SourceBase.prototype, "Result", {
        get: function () {
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    return SourceBase;
}());
exports.SourceBase = SourceBase;
