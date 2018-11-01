"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class ConnectionBase extends abstract_1.Cloneable {
    get IsActive() {
        return this._isActive;
    }
    set IsActive(value) {
        this._isActive = value;
    }
    constructor() {
        super();
        this._isActive = true;
    }
}
exports.ConnectionBase = ConnectionBase;
