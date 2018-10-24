import * as PackageSettingsReducers from "./PackageSettings";
import * as ProjectSettingsReducers from "./ProjectSettings";
import { Reducer } from "redux";

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
const IDReducer: Reducer<{ ID: string }> = (state: { ID: string }, action: any) => {
    switch (action.type) {
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { ID: "" };
};

export const reducers = {
    ID: IDReducer,
    PackageSettings: PackageSettingsReducers.reducer,
    ProjectSettings: ProjectSettingsReducers.reducer,
};