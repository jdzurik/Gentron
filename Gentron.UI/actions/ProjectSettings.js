"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdateDatabaseConnectionGroup: (databaseSource) => {
        return {
            databaseConnectionGroup: databaseSource,
            type: "ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP"
        };
    },
    addOrUpdateLocalPackageFolder: (localPackageFolder) => {
        return {
            localPackageFolder: localPackageFolder,
            type: "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER"
        };
    },
    addOrUpdateOutputPathGroup: (outputPathGroup) => {
        return {
            outputPathGroup: outputPathGroup,
            type: "ADD_OR_UPDATE_OUTPUT_PATH"
        };
    },
    addOrUpdateRemotePackageLocation: (remotePackageLocation) => {
        return {
            remotePackageLocation: remotePackageLocation,
            type: "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION"
        };
    },
    removeDatabaseConnectionGroup: (databaseSource) => {
        return {
            databaseConnectionGroup: databaseSource,
            type: "REMOVE_DATABASE_CONNECTION_GROUP"
        };
    },
    removeOutputPathGroup: (outputPathGroup) => {
        return {
            outputPathGroup: outputPathGroup,
            type: "REMOVE_OUTPUT_PATH"
        };
    },
};
