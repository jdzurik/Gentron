"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guid_1 = require("./utils/Guid");
class OutputPath {
    get ID() {
        return this._id;
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
    get Path() {
        return this._path;
    }
    set Path(value) {
        this._path = value;
    }
    constructor() {
        this._id = Guid_1.default.newGuid();
        this._name = "";
        this._path = "";
    }
    toJson() {
        throw new Error("Method not implemented");
    }
    update(ouputPath) {
        this._name = ouputPath.Name;
        this._path = ouputPath.Path;
    }
}
exports.OutputPath = OutputPath;
