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
var DatabaseConnection_1 = require("./DatabaseConnection");
var SourceBase_1 = require("./SourceBase");
var DatabaseSource = (function (_super) {
    __extends(DatabaseSource, _super);
    function DatabaseSource() {
        var _this = _super.call(this) || this;
        _this._activeConnection = new DatabaseConnection_1.DatabaseConnection();
        return _this;
    }
    Object.defineProperty(DatabaseSource.prototype, "ActiveConnection", {
        get: function () {
            return this._activeConnection;
        },
        set: function (value) {
            this._activeConnection = value;
        },
        enumerable: true,
        configurable: true
    });
    return DatabaseSource;
}(SourceBase_1.SourceBase));
exports.DatabaseSource = DatabaseSource;
