"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageSettings = (function () {
    function PackageSettings() {
    }
    Object.defineProperty(PackageSettings.prototype, "PackageName", {
        get: function () {
            return this._packageName;
        },
        set: function (value) {
            this._packageName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageSettings.prototype, "ReadMeText", {
        get: function () {
            return this._readMeText;
        },
        set: function (value) {
            this._readMeText = value;
        },
        enumerable: true,
        configurable: true
    });
    PackageSettings.fromJson = function (jsonStr) {
        return JSON.parse(jsonStr);
    };
    PackageSettings.toJson = function (obj) {
        return JSON.stringify(obj);
    };
    return PackageSettings;
}());
exports.PackageSettings = PackageSettings;
