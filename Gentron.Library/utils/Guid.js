"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Guid = (function () {
    function Guid() {
    }
    Guid.newGuid = function () {
        return this._guidPlaceholder.replace(/[xy]/g, function (substring) {
            var rand = Math.random() * 16 | 0;
            var ret = (substring === "x")
                ? rand
                : (rand & 0x3 | 0x8);
            return ret.toString(16);
        });
    };
    Guid.newCryptoGuid = function () {
        var hex = [];
        for (var i = 0; i < 256; i++) {
            hex[i] = (i < 16 ? "0" : "") + (i).toString(16);
        }
        var rand = crypto.getRandomValues(new Uint8Array(16));
        rand[6] = rand[6] & 0x0f | 0x40;
        rand[8] = rand[8] & 0x3f | 0x80;
        return (hex[rand[0]] +
            hex[rand[1]] +
            hex[rand[2]] +
            hex[rand[3]] +
            "-" +
            hex[rand[4]] +
            hex[rand[5]] +
            "-" +
            hex[rand[6]] +
            hex[rand[7]] +
            "-" +
            hex[rand[8]] +
            hex[rand[9]] +
            "-" +
            hex[rand[10]] +
            hex[rand[11]] +
            hex[rand[12]] +
            hex[rand[13]] +
            hex[rand[14]] +
            hex[rand[15]]);
    };
    Guid._guidPlaceholder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return Guid;
}());
exports.default = Guid;
