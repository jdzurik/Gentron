"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SerializeBase {
    constructor() {
        this.IgnoreFields = [];
    }
    toJson(ignoreFields = this.IgnoreFields) {
        const keys = Object.keys(this);
        const nonIgnoredKeys = {};
        for (let key of keys) {
            if (key !== "IgnoreFields" && ignoreFields.indexOf(key) < 0) {
                if (this[key].__proto__ instanceof SerializeBase) {
                    nonIgnoredKeys[key] = this[key].toJson();
                }
                else if (this[key].toJson) {
                    nonIgnoredKeys[key] = this[key].__proto__.toJson();
                }
                else {
                    nonIgnoredKeys[key] = this[key];
                }
            }
        }
        return nonIgnoredKeys;
    }
}
exports.SerializeBase = SerializeBase;
