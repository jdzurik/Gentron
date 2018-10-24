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
var ConnectionBase_1 = require("./ConnectionBase");
var DatabaseConnection = (function (_super) {
    __extends(DatabaseConnection, _super);
    function DatabaseConnection() {
        var _this = _super.call(this) || this;
        _this._connectionString = "";
        _this._environment = "";
        return _this;
    }
    Object.defineProperty(DatabaseConnection.prototype, "ConnectionString", {
        get: function () {
            return this._connectionString;
        },
        set: function (value) {
            this._connectionString = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatabaseConnection.prototype, "Environment", {
        get: function () {
            return this._environment;
        },
        set: function (value) {
            this._environment = value;
        },
        enumerable: true,
        configurable: true
    });
    DatabaseConnection.prototype.toJson = function () {
        throw new Error("Method not implemented");
    };
    DatabaseConnection.prototype.update = function (dbConnection) {
        this.ConnectionString = dbConnection.ConnectionString;
        this.Environment = dbConnection.Environment;
        this.IsActive = dbConnection.IsActive;
    };
    return DatabaseConnection;
}(ConnectionBase_1.ConnectionBase));
exports.DatabaseConnection = DatabaseConnection;
