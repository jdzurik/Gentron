"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const abstract_1 = require("./abstract");
var TemplateTypes;
(function (TemplateTypes) {
    TemplateTypes[TemplateTypes["Partial"] = 0] = "Partial";
    TemplateTypes[TemplateTypes["Primary"] = 1] = "Primary";
})(TemplateTypes = exports.TemplateTypes || (exports.TemplateTypes = {}));
class Template extends abstract_1.Cloneable {
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
        super();
        this._id = _1.Utilities.newCryptoGuid();
        this._name = "";
        this._type = TemplateTypes.Partial;
    }
    clone() {
        const ret = new Template();
        ret._id = this._id;
        ret._name = this._name;
        ret._type = this._type;
        return ret;
    }
    fromJson(json) {
        this._name = json.Name;
        this._type = json.Type;
        return this;
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
