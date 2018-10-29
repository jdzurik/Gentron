"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionCreators = {
    addOrUpdateDatabaseSource: (databaseSource) => {
        return {
            databaseSource: databaseSource,
            type: "ADD_OR_UPDATE_DATABASE_SOURCE"
        };
    },
    addOrUpdateEngine: (engine) => {
        return {
            engine: engine,
            type: "ADD_OR_UPDATE_ENGINE"
        };
    },
    addOrUpdateEngineTemplate: (engineId, template) => {
        return {
            engineId: engineId,
            template: template,
            type: "ADD_OR_UPDATE_ENGINE_TEMPLATE"
        };
    },
    addOrUpdateEnvironment: (environment) => {
        return {
            environment: environment,
            type: "ADD_OR_UPDATE_ENVIRONMENT"
        };
    },
    addOrUpdateFileSource: (fileSource) => {
        return {
            fileSource: fileSource,
            type: "ADD_OR_UPDATE_FILE_SOURCE"
        };
    },
    addOrUpdateHttpSource: (httpSource) => {
        return {
            httpSource: httpSource,
            type: "ADD_OR_UPDATE_HTTP_SOURCE"
        };
    },
    addOrUpdatePackageName: (ev) => {
        return {
            packageName: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_PACKAGE_NAME"
        };
    },
    addOrUpdateReadMeText: (ev) => {
        return {
            readMeText: ev ? ev.target.value : "",
            type: "ADD_OR_UPDATE_READ_ME_TEXT"
        };
    },
    removeDatabaseSource: (databaseSource) => {
        return {
            databaseSource: databaseSource,
            type: "REMOVE_DATABASE_SOURCE"
        };
    },
    removeEngine: (engine) => {
        return {
            engine: engine,
            type: "REMOVE_ENGINE"
        };
    },
    removeEngineTemplate: (engineId, template) => {
        return {
            engineId: engineId,
            template: template,
            type: "REMOVE_ENGINE_TEMPLATE"
        };
    },
    removeEnvironment: (environment) => {
        return {
            environment: environment,
            type: "REMOVE_ENVIRONMENT"
        };
    },
    removeFileSource: (fileSource) => {
        return {
            fileSource: fileSource,
            type: "REMOVE_FILE_SOURCE"
        };
    },
    removeHttpSource: (httpSource) => {
        return {
            httpSource: httpSource,
            type: "REMOVE_HTTP_SOURCE"
        };
    },
    toggleActiveEnvironment: (environment) => {
        return {
            environment: environment,
            type: "TOGGLE_ACTIVE_ENVIRONMENT"
        };
    },
};
