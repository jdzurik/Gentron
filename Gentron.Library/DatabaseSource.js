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
var ConnectionGroup_1 = require("./ConnectionGroup");
var SourceBase_1 = require("./SourceBase");
var DatabaseSource = (function (_super) {
    __extends(DatabaseSource, _super);
    function DatabaseSource() {
        var _this = _super.call(this) || this;
        _this._activeConnectionGroup = new ConnectionGroup_1.ConnectionGroup();
        return _this;
    }
    Object.defineProperty(DatabaseSource.prototype, "ActiveConnectionGroup", {
        get: function () {
            return this._activeConnectionGroup;
        },
        set: function (value) {
            this._activeConnectionGroup = value;
        },
        enumerable: true,
        configurable: true
    });
    DatabaseSource.prototype.toJson = function () {
        throw new Error("Method not implemented");
    };
    DatabaseSource.prototype.update = function (databaseSource) {
        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;
    };
    return DatabaseSource;
}(SourceBase_1.SourceBase));
exports.DatabaseSource = DatabaseSource;
