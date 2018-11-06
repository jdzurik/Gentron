"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PackageSettingsReducers = require("./PackageSettings");
const ProjectSettingsReducers = require("./ProjectSettings");
const IDReducer = (state, action) => {
    switch (action.type) {
        default:
            const exhaustiveCheck = action;
    }
    return state || "";
};
exports.reducers = {
    ID: IDReducer,
    PackageSettings: PackageSettingsReducers.reducer,
    ProjectSettings: ProjectSettingsReducers.reducer,
};
