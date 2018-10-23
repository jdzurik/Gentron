import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ProjectSettingsActionNames } from "../constants/ActionNames";
import { ChangeEvent } from 'react';
import { IConnectionGroup, IDatabaseConnection } from '../../Gentron.Library';

export interface AddOrUpdateDatabaseConnectionGroupAction {
    databaseConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    type: ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup;
}

export interface AddOrUpdateLocalPackageFolderAction {
    localPackageFolder: string;
    type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction;
}

export interface AddOrUpdateOutputCodeFolderAction {
    outputCodeFolder: string;
    type: ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction;
}

export interface AddOrUpdateRemotePackageLocationAction {
    remotePackageLocation: string;
    type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction;
}

export interface RemoveDatabaseConnectionGroupAction {
    databaseConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    type: ProjectSettingsActionNames.RemoveDatabaseConnectionGroup;
}

export type KnownProjectSettingsAction = AddOrUpdateDatabaseConnectionGroupAction
    | AddOrUpdateLocalPackageFolderAction
    | AddOrUpdateOutputCodeFolderAction
    | AddOrUpdateRemotePackageLocationAction
    | RemoveDatabaseConnectionGroupAction;

export const ActionCreators = {
    addOrUpdateDatabaseConnectionGroup: (databaseSource: IConnectionGroup<IDatabaseConnection>) => {
        return <AddOrUpdateDatabaseConnectionGroupAction>{
            databaseConnectionGroup: databaseSource,
            type: ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup
        };
    },
    addOrUpdateLocalPackageFolder: (ev?: ChangeEvent<HTMLInputElement>) => {
        return <AddOrUpdateLocalPackageFolderAction>{
            localPackageFolder: ev ? ev.target.value : "",
            type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction
        };
    },
    addOrUpdateOutputCodeFolder: (ev?: ChangeEvent<HTMLInputElement>) => {
        return <AddOrUpdateOutputCodeFolderAction>{
            outputCodeFolder: ev ? ev.target.value : "",
            type: ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction
        };
    },
    addOrUpdateRemotePackageLocation: (ev?: ChangeEvent<HTMLInputElement>) => {
        return <AddOrUpdateRemotePackageLocationAction>{
            remotePackageLocation: ev ? ev.target.value : "",
            type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction
        };
    },
    removeDatabaseConnectionGroup: (databaseSource: IConnectionGroup<IDatabaseConnection>) => {
        return <RemoveDatabaseConnectionGroupAction>{
            databaseConnectionGroup: databaseSource,
            type: ProjectSettingsActionNames.RemoveDatabaseConnectionGroup
        };
    },
};