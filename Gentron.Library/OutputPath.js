"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
class OutputPath extends abstract_1.Cloneable {
    get Environment() {
        return this._environment;
    }
    set Environment(value) {
        this._environment = value;
    }
    get Path() {
        return this._path;
    }
    set Path(value) {
        this._path = value;
    }
    constructor() {
        super();
        this._environment = "";
        this._path = "";
    }
    clone() {
        const ret = new OutputPath();
        ret._cloneId = this._id;
        ret._isClone = true;
        ret._environment = this._environment;
        ret._path = this._path;
        return ret;
    }
    update(ouputPath) {
        this._environment = ouputPath.Environment;
        this._path = ouputPath.Path;
    }
}
exports.OutputPath = OutputPath;
