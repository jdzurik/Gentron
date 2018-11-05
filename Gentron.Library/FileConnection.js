"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionBase_1 = require("./ConnectionBase");
class FileConnection extends ConnectionBase_1.ConnectionBase {
    get Environment() {
        return this._environment;
    }
    set Environment(value) {
        this._environment = value;
    }
    constructor() {
        super();
        this._environment = "";
    }
    fromJson(json) {
        this._environment = json.Environment;
        this._id = json.ID;
        this._isActive = json.IsActive;
        return this;
    }
    toJson() {
        return {
            Environment: this._environment,
            ID: this._id,
            IsActive: this._isActive
        };
    }
    clone() {
        throw new Error("Method not implemented");
    }
    update(dbConnection) {
        throw new Error("Method not implemented");
    }
}
exports.FileConnection = FileConnection;
