"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("./abstract");
const _1 = require("./");
class OutputPathGroup extends abstract_1.Cloneable {
    constructor() {
        super();
        this._name = "";
        this._paths = [];
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
    get Paths() {
        return (this._paths || []).slice();
    }
    addOrUpdatePath(connection) {
        this._paths.push(connection);
    }
    removePath(connection) {
    }
    fromJson(json) {
        this._name = json.Name;
        this._paths = json.Paths.map((path, index) => new _1.OutputPath().fromJson(path));
        return this;
    }
    toJson() {
        return {
            ID: this._id,
            Name: this._name,
            Paths: this._paths
        };
    }
    clone() {
        const ret = new OutputPathGroup();
        ret._cloneId = this.ID;
        ret._isClone = true;
        ret._name = this._name;
        ret._paths = this._paths.map((conn, i) => conn.clone());
        return ret;
    }
    update(connection) {
        this._name = connection.Name;
        this._paths = connection.Paths.map((conn, i) => conn.clone());
    }
}
exports.OutputPathGroup = OutputPathGroup;
