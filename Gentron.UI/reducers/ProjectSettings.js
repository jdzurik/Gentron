"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron_Library_1 = require("../../Gentron.Library");
var _unloadedProjectSettingsState = new Gentron_Library_1.ProjectSettings();
exports.reducer = function (state, action) {
    switch (action.type) {
        case "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER":
            return {
                LocalPackageFolder: action.localPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_OUTPUT_CODE_FOLDER":
            return {
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: action.outputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION":
            return {
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: action.remotePackageLocation
            };
        default:
            var exhaustiveCheck = action;
    }
    return state || _unloadedProjectSettingsState;
};
