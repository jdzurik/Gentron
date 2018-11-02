"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class Cloneable {
    constructor() {
        this._id = __1.Utilities.newCryptoGuid();
    }
    get ID() {
        return this._id;
    }
}
exports.default = Cloneable;
