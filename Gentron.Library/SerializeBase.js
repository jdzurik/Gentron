"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerializeBase = (function () {
    function SerializeBase() {
        this.IgnoreFields = [];
    }
    SerializeBase.prototype.toJson = function (ignoreFields) {
        if (ignoreFields === void 0) { ignoreFields = this.IgnoreFields; }
        var keys = Object.keys(this);
        var nonIgnoredKeys = {};
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
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
    };
    return SerializeBase;
}());
exports.SerializeBase = SerializeBase;
