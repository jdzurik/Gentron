"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const __1 = require("../");
class Cloneable extends _1.JsonSerializable {
    constructor() {
        super();
        this._cloneId = "";
        this._isClone = false;
        this._id = __1.Utilities.newCryptoGuid();
        this.IgnoreFields.push("_cloneId");
        this.IgnoreFields.push("_isClone");
    }
    get ID() {
        return (this._isClone && this._cloneId)
            ? this._cloneId
            : this._id;
    }
}
exports.default = Cloneable;
