import * as ProjectSettingsActions from '../actions/ProjectSettings';
import { NonFunctionProperties } from '../types';
import { ProjectSettings, IProjectSettings } from "../../Gentron.Library";
import { ProjectSettingsActionNames } from "../constants/ActionNames";
import { Reducer } from 'redux';
import { start } from 'repl';

type ProjectSettingsProps = NonFunctionProperties<IProjectSettings>;

const _unloadedProjectSettingsState: IProjectSettings = new ProjectSettings();

export const reducer: Reducer<ProjectSettingsProps> = (state: ProjectSettingsProps, action: ProjectSettingsActions.KnownProjectSettingsAction) => {
    switch (action.type) {
        case ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup:
            let found: boolean = false;
            for (let i: number = 0; i < state.DatabaseConnections.length; ++i) {
                if (state.DatabaseConnections[i].ID === action.databaseConnectionGroup.ID) {
                    state.DatabaseConnections[i].update(action.databaseConnectionGroup);
                    found = true;
                    break;
                }
            }

            if (!found) {
                state.DatabaseConnections.push(action.databaseConnectionGroup);
            }

            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: action.localPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: action.outputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: action.remotePackageLocation
            };
        case ProjectSettingsActionNames.RemoveDatabaseConnectionGroup:
            let foundIdx: number = -1;
            for (let i: number = 0; i < state.DatabaseConnections.length; ++i) {
                if (state.DatabaseConnections[i].ID === action.databaseConnectionGroup.ID) {
                    foundIdx = i;
                    break;
                }
            }

            if (foundIdx >= 0) {
                state.DatabaseConnections.splice(foundIdx, 1);
            }

            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputCodeFolder: state.OutputCodeFolder,
                RemotePackageLocation: state.RemotePackageLocation
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedProjectSettingsState;
};