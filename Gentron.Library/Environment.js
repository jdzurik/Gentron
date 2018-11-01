"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class Environment extends abstract_1.Cloneable {
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
        super();
        this._isActive = false;
        this._name = "";
    }
    toJson() {
        throw new Error("Method not implemented");
    }
    clone() {
        const ret = new Environment();
        ret._cloneId = this._id;
        ret._isActive = this._isActive;
        ret._isClone = true;
        ret._name = this._name;
        return ret;
    }
    update(environment) {
        this._isActive = environment.IsActive;
        this._name = environment.Name;
    }
}
exports.Environment = Environment;
