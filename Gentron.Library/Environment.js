"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Environment {
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
    constructor() {
        this._id = _1.Utilities.newCryptoGuid();
        this._isActive = false;
        this._name = "";
    }
    toJson() {
        throw new Error("Method not implemented");
    }
    update(environment) {
        this._isActive = environment.IsActive;
        this._name = environment.Name;
    }
}
exports.Environment = Environment;
