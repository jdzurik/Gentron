import * as GentronReducers from "./Gentron";
import * as PackageSettingsReducers from "./PackageSettings";
import * as ProjectSettingsReducers from "./ProjectSettings";

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    ActiveProjectPath: GentronReducers.reducer,
    PackageSettings: PackageSettingsReducers.reducer,
    ProjectSettings: ProjectSettingsReducers.reducer,
};