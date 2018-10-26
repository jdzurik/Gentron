"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
class Engine extends SourceBase_1.SourceBase {
    constructor() {
        super();
        this.Templates = [];
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
