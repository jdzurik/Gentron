import * as ProjectSettingsActions from '../actions/ProjectSettings';
import { NonFunctionProperties } from '../types';
import { ProjectSettings, IProjectSettings } from "../../Gentron.Library";
import { ProjectSettingsActionNames } from "../constants/ActionNames";
import { Reducer } from 'redux';

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
                OutputPathGroups: state.OutputPathGroups,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: action.localPackageFolder,
                OutputPathGroups: state.OutputPathGroups,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateOutputPathGroupAction:
            let pathFound: boolean = false;
            for (let i: number = 0; i < state.OutputPathGroups.length; ++i) {
                if (state.OutputPathGroups[i].ID === action.outputPathGroup.ID) {
                    state.OutputPathGroups[i].update(action.outputPathGroup);
                    pathFound = true;
                    break;
                }
            }

            if (!pathFound) {
                state.OutputPathGroups.push(action.outputPathGroup);
            }

            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPathGroups: state.OutputPathGroups,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction:
            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPathGroups: state.OutputPathGroups,
                RemotePackageLocation: action.remotePackageLocation
            };
        case ProjectSettingsActionNames.RemoveDatabaseConnectionGroup:
            let foundDatabaseConnectionIdx: number = -1;
            for (let i: number = 0; i < state.DatabaseConnections.length; ++i) {
                if (state.DatabaseConnections[i].ID === action.databaseConnectionGroup.ID) {
                    foundDatabaseConnectionIdx = i;
                    break;
                }
            }

            if (foundDatabaseConnectionIdx >= 0) {
                state.DatabaseConnections.splice(foundDatabaseConnectionIdx, 1);
            }

            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPathGroups: state.OutputPathGroups,
                RemotePackageLocation: state.RemotePackageLocation
            };
        case ProjectSettingsActionNames.RemoveOutputPathGroupAction:
            let foundOutputPathIdx: number = -1;
            for (let i: number = 0; i < state.OutputPathGroups.length; ++i) {
                if (state.OutputPathGroups[i].ID === action.outputPathGroup.ID) {
                    foundOutputPathIdx = i;
                    break;
                }
            }

            if (foundOutputPathIdx >= 0) {
                state.OutputPathGroups.splice(foundOutputPathIdx, 1);
            }

            return {
                DatabaseConnections: state.DatabaseConnections,
                FileConnections: state.FileConnections,
                HttpConnections: state.HttpConnections,
                LocalPackageFolder: state.LocalPackageFolder,
                OutputPathGroups: state.OutputPathGroups,
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