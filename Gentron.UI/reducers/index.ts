import * as GentronReducers from "./Gentron";
import * as PackageSettingsReducers from "./PackageSettings";
import * as ProjectSettingsReducers from "./ProjectSettings";
import { IGentron } from "../../Gentron.Library";
import { AnyAction, combineReducers } from "redux";
import { GentronActionNames } from "../constants/ActionNames";

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const appReducers = combineReducers({
    ActiveProjectPath: GentronReducers.reducer,
    PackageSettings: PackageSettingsReducers.reducer,
    ProjectSettings: ProjectSettingsReducers.reducer
});

export const rootReducer = (state: IGentron, action: AnyAction) => {
    if (action.type === GentronActionNames.OpenProject) {
        const newState: IGentron = (action as any).newState;
        state = {
            ActiveProjectPath: newState.ActiveProjectPath,
            PackageSettings: newState.PackageSettings,
            ProjectSettings: newState.ProjectSettings
        };
    }

    return appReducers(state, action);
};