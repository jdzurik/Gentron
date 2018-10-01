import { Action, Reducer } from 'redux';
import { ProjectSettings, IProjectSettings } from "../../Gentron.Library";
import * as ProjectSettingsActions from '../actions/ProjectSettings';
import { ProjectSettingsActionNames } from "../constants/ActionNames";
import { AddOrUpdateLocalPackageFolderAction, AddOrUpdateOutputCodeFolderAction, AddOrUpdateRemotePackageLocationAction } from '../actions/ProjectSettings';

const _unloadedProjectSettingsState: IProjectSettings = new ProjectSettings();

export const reducer: Reducer<IProjectSettings> = (state: IProjectSettings, action: ProjectSettingsActions.KnownProjectSettingsAction) => {
    switch (action.type) {
        case ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: (action as AddOrUpdateLocalPackageFolderAction).localPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: (action as AddOrUpdateOutputCodeFolderAction).outputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: (action as AddOrUpdateRemotePackageLocationAction).remotePackageLocation
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedProjectSettingsState;
};