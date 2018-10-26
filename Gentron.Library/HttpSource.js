"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SourceBase_1 = require("./SourceBase");
class HttpSource extends SourceBase_1.SourceBase {
    toJson() {
        throw new Error("Method not implemented");
    }
    update(httpSource) {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
}
exports.HttpSource = HttpSource;
