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
var FileSource = (function (_super) {
    __extends(FileSource, _super);
    function FileSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSource.prototype.toJson = function () {
        throw new Error("Method not implemented");
    };
    FileSource.prototype.update = function (fileSource) {
        this.IsActive = fileSource.IsActive;
        this.Name = fileSource.Name;
        this.Result = fileSource.Result;
    };
    return FileSource;
}(SourceBase_1.SourceBase));
exports.FileSource = FileSource;
