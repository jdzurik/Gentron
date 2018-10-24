"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdateDatabaseSource: function (databaseSource) {
        return {
            databaseSource: databaseSource,
            type: "ADD_OR_UPDATE_DATABASE_SOURCE"
        };
    },
    addOrUpdateEngine: function (engine) {
        return {
            engine: engine,
            type: "ADD_OR_UPDATE_ENGINE"
        };
    },
    addOrUpdateEngineTemplate: function (engineId, template) {
        return {
            engineId: engineId,
            template: template,
            type: "ADD_OR_UPDATE_ENGINE_TEMPLATE"
        };
    },
    addOrUpdateFileSource: function (fileSource) {
        return {
            fileSource: fileSource,
            type: "ADD_OR_UPDATE_FILE_SOURCE"
        };
    },
    addOrUpdateHttpSource: function (httpSource) {
        return {
            httpSource: httpSource,
            type: "ADD_OR_UPDATE_HTTP_SOURCE"
        };
    },
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
    removeDatabaseSource: function (databaseSource) {
        return {
            databaseSource: databaseSource,
            type: "REMOVE_DATABASE_SOURCE"
        };
    },
    removeEngine: function (engine) {
        return {
            engine: engine,
            type: "REMOVE_ENGINE"
        };
    },
    removeEngineTemplate: function (engineId, template) {
        return {
            engineId: engineId,
            template: template,
            type: "REMOVE_ENGINE_TEMPLATE"
        };
    },
    removeFileSource: function (fileSource) {
        return {
            fileSource: fileSource,
            type: "REMOVE_FILE_SOURCE"
        };
    },
    removeHttpSource: function (httpSource) {
        return {
            httpSource: httpSource,
            type: "REMOVE_HTTP_SOURCE"
        };
    },
};
