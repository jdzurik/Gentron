"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdatePackageName: function (ev) {
        return {
            packageName: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_PACKAGE_NAME"
        };
    },
    addOrUpdateReadMeText: function (ev) {
        return {
            readMeText: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_READ_ME_TEXT"
        };
    },
};
