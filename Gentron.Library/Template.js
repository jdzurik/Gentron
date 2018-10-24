"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("./Types");
var Guid_1 = require("./utils/Guid");
var Template = (function () {
    function Template() {
        this._id = Guid_1.default.newGuid();
        this._name = "";
        this._type = Types_1.TemplateTypes.Partial;
    }
    Object.defineProperty(Template.prototype, "ID", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Template.prototype, "Name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Template.prototype, "Type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Template.prototype.toJson = function () {
        throw new Error("Method not implemented");
    };
    Template.prototype.update = function (template) {
        this._name = template.Name;
        this._type = template.Type;
    };
    return Template;
}());
exports.Template = Template;
