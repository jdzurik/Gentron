"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionBase_1 = require("./ConnectionBase");
class HttpConnection extends ConnectionBase_1.ConnectionBase {
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
    toJson() {
        throw new Error("Method not implemented");
    }
    update(dbConnection) {
        throw new Error("Method not implemented");
    }
}
exports.HttpConnection = HttpConnection;
