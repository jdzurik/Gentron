"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gentron_Library_1 = require("../../Gentron.Library");
const _unloadedProjectSettingsState = new Gentron_Library_1.ProjectSettings();
exports.reducer = (state, action) => {
    switch (action.type) {
        case "ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP":
            let found = false;
            for (let i = 0; i < state.DatabaseConnections.length; ++i) {
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
                OutputPaths: state.OutputPaths,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER":
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: action.localPackageFolder,
                OutputPaths: state.OutputPaths,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_OUTPUT_PATH":
            let pathFound = false;
            for (let i = 0; i < state.OutputPaths.length; ++i) {
                if (state.OutputPaths[i].ID === action.outputPath.ID) {
                    state.OutputPaths[i].update(action.outputPath);
                    pathFound = true;
                    break;
                }
            }
            if (!pathFound) {
                state.OutputPaths.push(action.outputPath);
            }
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPaths: state.OutputPaths,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION":
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPaths: state.OutputPaths,
                RemotePackageLocation: action.remotePackageLocation
            };
        case "REMOVE_DATABASE_CONNECTION_GROUP":
            let foundDatabaseConnectionIdx = -1;
            for (let i = 0; i < state.DatabaseConnections.length; ++i) {
                if (state.DatabaseConnections[i].ID === action.databaseConnectionGroup.ID) {
                    foundDatabaseConnectionIdx = i;
                    break;
                }
            }
            if (foundDatabaseConnectionIdx >= 0) {
                state.DatabaseConnections.splice(foundDatabaseConnectionIdx, 1);
            }
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPaths: state.OutputPaths,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case "REMOVE_OUTPUT_PATH":
            let foundOutputPathIdx = -1;
            for (let i = 0; i < state.OutputPaths.length; ++i) {
                if (state.OutputPaths[i].ID === action.outputPath.ID) {
                    foundOutputPathIdx = i;
                    break;
                }
            }
            if (foundOutputPathIdx >= 0) {
                state.OutputPaths.splice(foundOutputPathIdx, 1);
            }
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPaths: state.OutputPaths,
                RemotePackageLocation: state.RemotePackageLocation
            };
        default:
            const exhaustiveCheck = action;
    }
    return state || _unloadedProjectSettingsState;
};
