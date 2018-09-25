"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdateLocalPackageFolder: function (ev) {
        return {
            localPackageFolder: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER"
        };
    },
    addOrUpdateOutputCodeFolder: function (ev) {
        return {
            outputCodeFolder: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_OUTPUT_CODE_FOLDER"
        };
    },
    addOrUpdateRemotePackageLocation: function (ev) {
        return {
            remotePackageLocation: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION"
        };
    }
};
