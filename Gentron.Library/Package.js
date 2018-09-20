"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Package = /** @class */ (function () {
    /*
     *  Constructors
     */
    function Package() {
    }
    Object.defineProperty(Package.prototype, "PackageName", {
        get: function () {
            return this._packageName;
        },
        set: function (_packageName) {
            this._packageName = _packageName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Package.prototype, "ReadMeText", {
        get: function () {
            return this._readMeText;
        },
        set: function (_readMeText) {
            this._readMeText = _readMeText;
        },
        enumerable: true,
        configurable: true
    });
    /*
     *  Methods
     */
    Package.fromJson = function (jsonStr) {
        return JSON.parse(jsonStr);
    };
    Package.toJson = function (packageObj) {
        return JSON.stringify(packageObj);
    };
    return Package;
}());
exports.default = Package;
