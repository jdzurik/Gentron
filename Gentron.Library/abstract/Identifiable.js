"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class Identifiable {
    get ID() {
        return this._id;
    }
    constructor(id) {
        this._id = id || __1.Utilities.newCryptoGuid();
    }
}
exports.default = Identifiable;
