"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gentron_Library_1 = require("../../Gentron.Library");
var _unloadedPackageSettingsState = new Gentron_Library_1.PackageSettings();
exports.reducer = function (state, action) {
    switch (action.type) {
        case "ADD_OR_UPDATE_DATABASE_SOURCE":
            var dbSourceFound = false;
            for (var i = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.databaseSource.ID) {
                    state.DatabaseSources[i].update(action.databaseSource);
                    dbSourceFound = true;
                    break;
                }
            }
            if (!dbSourceFound) {
                state.DatabaseSources.push(action.databaseSource);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "ADD_OR_UPDATE_ENGINE":
            var engineFound = false;
            for (var i = 0; i < state.Engines.length; ++i) {
                if (state.Engines[i].ID === action.engine.ID) {
                    state.Engines[i].update(action.engine);
                    engineFound = true;
                    break;
                }
            }
            if (!engineFound) {
                state.Engines.push(action.engine);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "ADD_OR_UPDATE_FILE_SOURCE":
            var fileSourceFound = false;
            for (var i = 0; i < state.FileSources.length; ++i) {
                if (state.FileSources[i].ID === action.fileSource.ID) {
                    state.FileSources[i].update(action.fileSource);
                    fileSourceFound = true;
                    break;
                }
            }
            if (!fileSourceFound) {
                state.FileSources.push(action.fileSource);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "ADD_OR_UPDATE_HTTP_SOURCE":
            var httpSourceFound = false;
            for (var i = 0; i < state.HttpSources.length; ++i) {
                if (state.HttpSources[i].ID === action.httpSource.ID) {
                    state.HttpSources[i].update(action.httpSource);
                    httpSourceFound = true;
                    break;
                }
            }
            if (!httpSourceFound) {
                state.HttpSources.push(action.httpSource);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "ADD_OR_UPDATE_PACKAGE_NAME":
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: action.packageName,
                ReadMeText: state.ReadMeText,
            };
        case "ADD_OR_UPDATE_READ_ME_TEXT":
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: action.readMeText,
            };
        case "REMOVE_DATABASE_SOURCE":
            var dbSourceIdx = -1;
            for (var i = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.databaseSource.ID) {
                    dbSourceIdx = i;
                    break;
                }
            }
            if (dbSourceIdx >= 0) {
                state.DatabaseSources.splice(dbSourceIdx, 1);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "REMOVE_ENGINE":
            var engineIdx = -1;
            for (var i = 0; i < state.Engines.length; ++i) {
                if (state.Engines[i].ID === action.engine.ID) {
                    engineIdx = i;
                    break;
                }
            }
            if (engineIdx >= 0) {
                state.Engines.splice(engineIdx, 1);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "REMOVE_FILE_SOURCE":
            var fileSourceIdx = -1;
            for (var i = 0; i < state.FileSources.length; ++i) {
                if (state.FileSources[i].ID === action.fileSource.ID) {
                    fileSourceIdx = i;
                    break;
                }
            }
            if (fileSourceIdx >= 0) {
                state.FileSources.splice(fileSourceIdx, 1);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case "REMOVE_HTTP_SOURCE":
            var httpSourceIdx = -1;
            for (var i = 0; i < state.HttpSources.length; ++i) {
                if (state.HttpSources[i].ID === action.httpSource.ID) {
                    httpSourceIdx = i;
                    break;
                }
            }
            if (httpSourceIdx >= 0) {
                state.HttpSources.splice(httpSourceIdx, 1);
            }
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        default:
            var exhaustiveCheck = action;
    }
    return state || _unloadedPackageSettingsState;
};
