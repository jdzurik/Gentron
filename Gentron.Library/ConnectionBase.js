"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guid_1 = require("./utils/Guid");
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
        this._id = Guid_1.default.newCryptoGuid();
        this._isActive = true;
    }
}
exports.ConnectionBase = ConnectionBase;
