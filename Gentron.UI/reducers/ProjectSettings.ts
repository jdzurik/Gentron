import { Action, Reducer } from 'redux';
import { ProjectSettings, ProjectSettingsState } from "../../Gentron.Library";
import * as ProjectSettingsActions from '../actions/ProjectSettings';

const _unloadedProjectSettingsState: ProjectSettingsState = new ProjectSettings();

export const reducer: Reducer<ProjectSettingsState> = (state: ProjectSettingsState, action: ProjectSettingsActions.KnownProjectSettingsAction) => {
    switch (action.type) {
        case ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction:
            return {
                LocalPackageFolder: action.localPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction:
            return {
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: action.outputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction:
            return {
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: action.remotePackageLocation
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedProjectSettingsState;
};