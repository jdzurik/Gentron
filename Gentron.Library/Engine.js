"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
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
    toJson() {
        throw new Error("Method not implemented");
    }
    update(engine) {
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
}
exports.Engine = Engine;
