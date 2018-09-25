"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageSettingsReducers = require("./PackageSettings");
var ProjectSettingsReducers = require("./ProjectSettings");
exports.reducers = {
    PackageSettings: PackageSettingsReducers.reducer,
    ProjectSettings: ProjectSettingsReducers.reducer,
};
