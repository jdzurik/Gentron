"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guid_1 = require("./utils/Guid");
class SourceBase {
    get ID() {
        return this._id;
    }
    get IsActive() {
        return this._isActive;
    }
    set IsActive(value) {
        this._isActive = value;
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
    get Result() {
        return this._result;
    }
    set Result(value) {
        this._result = value;
    }
    constructor() {
        this._id = Guid_1.default.newCryptoGuid();
        this._isActive = true;
        this._name = "";
        this._result = "";
    }
}
exports.SourceBase = SourceBase;
