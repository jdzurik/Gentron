"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("./Types");
const _1 = require(".");
class Template {
    get ID() {
        return this._id;
    }
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }
    get Type() {
        return this._type;
    }
    set Type(value) {
        this._type = value;
    }
    constructor() {
        this._id = _1.Utilities.newGuid();
        this._name = "";
        this._type = Types_1.TemplateTypes.Partial;
    }
    toJson() {
        throw new Error("Method not implemented");
    }
    update(template) {
        this._name = template.Name;
        this._type = template.Type;
    }
}
exports.Template = Template;
