"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SourceBase_1 = require("./SourceBase");
var Engine = (function (_super) {
    __extends(Engine, _super);
    function Engine() {
        var _this = _super.call(this) || this;
        _this.Templates = [];
        return _this;
    }
    Engine.prototype.toJson = function () {
        throw new Error("Method not implemented");
    };
    Engine.prototype.update = function (engine) {
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    };
    return Engine;
}(SourceBase_1.SourceBase));
exports.Engine = Engine;
