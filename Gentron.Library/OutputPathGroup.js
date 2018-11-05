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
        this._id = json.ID;
        this._name = json.Name;
        this._paths = json.Paths.map((path, index) => {
            return new _1.OutputPath().fromJson(path);
        });
        return this;
    }
    toJson() {
        return {
            ID: this._id,
            Name: this._name,
            Paths: this._paths.map((path, index) => {
                return path.toJson();
            })
        };
    }
    clone() {
        const ret = new OutputPathGroup();
        ret._id = this._id;
        ret._name = this._name;
        ret._paths = this._paths.map((conn, i) => {
            return conn.clone();
        });
        return ret;
    }
    update(connection) {
        this._name = connection.Name;
        this._paths = connection.Paths.map((conn, i) => {
            return conn.clone();
        });
    }
}
exports.OutputPathGroup = OutputPathGroup;
