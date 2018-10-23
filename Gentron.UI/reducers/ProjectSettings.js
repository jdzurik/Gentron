"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron_Library_1 = require("../../Gentron.Library");
var _unloadedProjectSettingsState = new Gentron_Library_1.ProjectSettings();
exports.reducer = function (state, action) {
    switch (action.type) {
        case "ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP":
            var found = false;
            for (var i = 0; i < state.DatabaseConnections.length; ++i) {
                if (state.DatabaseConnections[i].ID === action.databaseConnectionGroup.ID) {
                    state.DatabaseConnections[i].update(action.databaseConnectionGroup);
                    found = true;
                    break;
                }
            }
            if (!found) {
                state.DatabaseConnections.push(action.databaseConnectionGroup);
            }
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER":
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: action.localPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_OUTPUT_CODE_FOLDER":
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: action.outputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION":
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: action.remotePackageLocation
            };
        case "REMOVE_DATABASE_CONNECTION_GROUP":
            var foundIdx = -1;
            for (var i = 0; i < state.DatabaseConnections.length; ++i) {
                if (state.DatabaseConnections[i].ID === action.databaseConnectionGroup.ID) {
                    foundIdx = i;
                    break;
                }
            }
            if (foundIdx >= 0) {
                state.DatabaseConnections.splice(foundIdx, 1);
            }
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        default:
            var exhaustiveCheck = action;
    }
    return state || _unloadedProjectSettingsState;
};
