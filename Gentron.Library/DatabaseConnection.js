"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionBase_1 = require("./ConnectionBase");
class DatabaseConnection extends ConnectionBase_1.ConnectionBase {
    get ConnectionString() {
        return this._connectionString;
    }
    set ConnectionString(value) {
        this._connectionString = value;
    }
    get Environment() {
        return this._environment;
    }
    set Environment(value) {
        this._environment = value;
    }
    constructor() {
        super();
        this._connectionString = "";
        this._environment = "";
    }
    clone() {
        const ret = new DatabaseConnection();
        ret._connectionString = this._connectionString;
        ret._environment = this._environment;
        ret._id = this._id;
        ret._isActive = this._isActive;
        return ret;
    }
    fromJson(json) {
        this._connectionString = json.ConnectionString;
        this._environment = json.Environment;
        this._id = json.ID;
        this._isActive = json.IsActive;
        return this;
    }
    toJson() {
        return {
            ConnectionString: this._connectionString,
            Environment: this._environment,
            ID: this._id,
            IsActive: this._isActive
        };
    }
    update(dbConnection) {
        this.ConnectionString = dbConnection.ConnectionString;
        this.Environment = dbConnection.Environment;
        this.IsActive = dbConnection.IsActive;
    }
}
exports.DatabaseConnection = DatabaseConnection;
