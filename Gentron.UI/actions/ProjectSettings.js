"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdateLocalPackageFolder: function (localPackageFolder) { return function (dispatch, getState) {
        console.log("addOrUpdateLocalPackageFolder: " + localPackageFolder);
        return {
            localPackageFolder: localPackageFolder,
            type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction
        };
    }; },
    addOrUpdateOutputCodeFolder: function (outputCodeFolder) { return function (dispatch, getState) {
        console.log("addOrUpdateOutputCodeFolder: " + outputCodeFolder);
        return {
            outputCodeFolder: outputCodeFolder,
            type: ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction
        };
    }; },
    addOrUpdateRemotePackageLocation: function (remotePackageLocation) { return function (dispatch, getState) {
        console.log("addOrUpdateRemotePackageLocation: " + remotePackageLocation);
        return {
            remotePackageLocation: remotePackageLocation,
            type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction
        };
    }; }
};
