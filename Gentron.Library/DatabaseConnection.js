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
    toJson() {
        throw new Error("Method not implemented");
    }
    update(dbConnection) {
        this.ConnectionString = dbConnection.ConnectionString;
        this.Environment = dbConnection.Environment;
        this.IsActive = dbConnection.IsActive;
    }
}
exports.DatabaseConnection = DatabaseConnection;
