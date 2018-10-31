"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const abstract_1 = require("./abstract");
class SourceBase extends abstract_1.JsonSerializable {
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
        super();
        this._id = _1.Utilities.newCryptoGuid();
        this._isActive = true;
        this._name = "";
        this._result = "";
    }
}
exports.SourceBase = SourceBase;
