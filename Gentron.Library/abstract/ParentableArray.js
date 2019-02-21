"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParentableArray extends Array {
    constructor(...args) {
        super(...args);
        this.Parent = null;
    }
    push(...args) {
        return super.push(...args);
    }
}
exports.default = ParentableArray;
//# sourceMappingURL=ParentableArray.js.map