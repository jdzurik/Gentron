"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid_1 = require("./utils/Guid");
var SourceBase = (function () {
    function SourceBase() {
        this._id = Guid_1.default.newCryptoGuid();
        this._isActive = true;
        this._name = "";
        this._result = "";
    }
    Object.defineProperty(SourceBase.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
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
