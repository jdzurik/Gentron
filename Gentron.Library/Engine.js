"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
const Template_1 = require("./Template");
class Engine extends SourceBase_1.SourceBase {
    get Templates() {
        return this._templates;
    }
    set Templates(value) {
        this._templates = value;
    }
    constructor() {
        super();
        this._templates = [];
    }
    fromJson(json) {
        this._id = json.ID;
        this._isActive = json.IsActive;
        this._name = json.Name;
        this._result = json.Result;
        this._templates = json.Templates.map((template, index) => {
            return new Template_1.Template().fromJson(template);
        });
        return this;
    }
    toJson() {
        return {
            ID: this._id,
            IsActive: this._isActive,
            Name: this._name,
            Result: this._result,
            Templates: this._templates.map((template, index) => {
                return template.toJson();
            })
        };
    }
    update(engine) {
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}
exports.Engine = Engine;
