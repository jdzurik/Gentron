"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageSettings = (function () {
    function PackageSettings() {
        this._packageName = "";
        this._readMeText = "";
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
    PackageSettings.fromJson = function (obj) {
        var ret = new PackageSettings();
        ret.PackageName = obj.PackageName;
        ret.ReadMeText = obj.ReadMeText;
        return ret;
    };
    PackageSettings.toJson = function (obj) {
        return {
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    };
    return PackageSettings;
}());
exports.PackageSettings = PackageSettings;
