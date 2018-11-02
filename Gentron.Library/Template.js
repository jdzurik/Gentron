"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
var TemplateTypes;
(function (TemplateTypes) {
    TemplateTypes[TemplateTypes["Partial"] = 0] = "Partial";
    TemplateTypes[TemplateTypes["Primary"] = 1] = "Primary";
})(TemplateTypes = exports.TemplateTypes || (exports.TemplateTypes = {}));
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
        this._type = TemplateTypes.Partial;
    }
    toJson() {
        return {
            ID: this._id,
            Name: this._name,
            Type: this._type
        };
    }
    update(template) {
        this._name = template.Name;
        this._type = template.Type;
    }
}
exports.Template = Template;
