"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron = /** @class */ (function () {
    /*
     *  Constructors
     */
    function Gentron() {
    }
    Object.defineProperty(Gentron.prototype, "Package", {
        get: function () {
            return this._package;
        },
        set: function (_package) {
            this._package = _package;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gentron.prototype, "Project", {
        get: function () {
            return this._project;
        },
        set: function (_project) {
            this._project = _project;
        },
        enumerable: true,
        configurable: true
    });
    /*
     *  Methods
     */
    Gentron.fromJson = function (jsonStr) {
        return JSON.parse(jsonStr);
    };
    Gentron.toJson = function (gentronObj) {
        return JSON.stringify(gentronObj);
    };
    return Gentron;
}());
exports.default = Gentron;
