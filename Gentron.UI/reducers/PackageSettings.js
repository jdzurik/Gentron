"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron_Library_1 = require("../../Gentron.Library");
var _unloadedPackageSettingsState = new Gentron_Library_1.PackageSettings();
exports.reducer = function (state, action) {
    switch (action.type) {
        case "ADD_OR_UPDATE_PACKAGE_NAME":
            return {
                PackageName: action.packageName,
                ReadMeText: state.ReadMeText,
            };
        case "ADD_OR_UPDATE_READ_ME_TEXT":
            return {
                PackageName: state.PackageName,
                ReadMeText: action.readMeText,
            };
        default:
            var exhaustiveCheck = action;
    }
    return state || _unloadedPackageSettingsState;
};
