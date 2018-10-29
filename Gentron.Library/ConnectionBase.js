"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class ConnectionBase {
    get ID() {
        return this._id;
    }
    get IsActive() {
        return this._isActive;
    }
    set IsActive(value) {
        this._isActive = value;
    }
    constructor() {
        this._id = _1.Utilities.newCryptoGuid();
        this._isActive = true;
    }
}
exports.ConnectionBase = ConnectionBase;
