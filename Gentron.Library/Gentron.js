"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron = (function () {
    function Gentron() {
    }
    Object.defineProperty(Gentron.prototype, "Package", {
        get: function () {
            return this._packageSettings;
        },
        set: function (value) {
            this._packageSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gentron.prototype, "Project", {
        get: function () {
            return this._projectSettings;
        },
        set: function (value) {
            this._projectSettings = value;
        },
        enumerable: true,
        configurable: true
    });
    Gentron.fromJson = function (jsonStr) {
        return JSON.parse(jsonStr);
    };
    Gentron.toJson = function (gentronObj) {
        return JSON.stringify(gentronObj);
    };
    return Gentron;
}());
exports.Gentron = Gentron;
