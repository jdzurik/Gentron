"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PackageSettingsReducers = require("./PackageSettings");
var ProjectSettingsReducers = require("./ProjectSettings");
var IDReducer = function (state, action) {
    switch (action.type) {
        default:
            var exhaustiveCheck = action;
    }
    return state || { ID: "" };
};
exports.reducers = {
    ID: IDReducer,
    PackageSettings: PackageSettingsReducers.reducer,
    ProjectSettings: ProjectSettingsReducers.reducer,
};
