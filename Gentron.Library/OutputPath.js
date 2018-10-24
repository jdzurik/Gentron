"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Guid_1 = require("./utils/Guid");
var OutputPath = (function () {
    function OutputPath() {
        this._id = Guid_1.default.newGuid();
        this._name = "";
        this._path = "";
    }
    Object.defineProperty(OutputPath.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutputPath.prototype, "Name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OutputPath.prototype, "Path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
        },
        enumerable: true,
        configurable: true
    });
    OutputPath.prototype.toJson = function () {
        throw new Error("Method not implemented");
    };
    OutputPath.prototype.update = function (ouputPath) {
        this._name = ouputPath.Name;
        this._path = ouputPath.Path;
    };
    return OutputPath;
}());
exports.OutputPath = OutputPath;
