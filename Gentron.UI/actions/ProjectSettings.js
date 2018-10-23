"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdateDatabaseConnectionGroup: function (databaseSource) {
        return {
            databaseConnectionGroup: databaseSource,
            type: "ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP"
        };
    },
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
    },
    removeDatabaseConnectionGroup: function (databaseSource) {
        return {
            databaseConnectionGroup: databaseSource,
            type: "REMOVE_DATABASE_CONNECTION_GROUP"
        };
    },
};
