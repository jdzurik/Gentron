"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Result {
    constructor() {
        this.ErrorMessage = "";
        this.IsError = false;
        this.Result = null;
    }
    static fail(errorMessage, result) {
        const ret = new Result();
        ret.ErrorMessage = errorMessage || "Application Error";
        ret.IsError = true;
        ret.Result = result;
        return ret;
    }
    static ok(result) {
        const ret = new Result();
        ret.ErrorMessage = "";
        ret.IsError = false;
        ret.Result = result;
        return ret;
    }
}
exports.default = Result;
//# sourceMappingURL=Result.js.map