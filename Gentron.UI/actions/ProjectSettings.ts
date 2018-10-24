import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ProjectSettingsActionNames } from "../constants/ActionNames";
import { ChangeEvent } from 'react';
import { IConnectionGroup, IDatabaseConnection, IOutputPath } from '../../Gentron.Library';

export interface AddOrUpdateDatabaseConnectionGroupAction {
    databaseConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    type: ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup;
}

export interface AddOrUpdateLocalPackageFolderAction {
    localPackageFolder: string;
    type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction;
}

export interface AddOrUpdateOutputPathAction {
    outputPath: IOutputPath;
    type: ProjectSettingsActionNames.AddOrUpdateOutputPathAction;
}

export interface AddOrUpdateRemotePackageLocationAction {
    remotePackageLocation: string;
    type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction;
}

export interface RemoveDatabaseConnectionGroupAction {
    databaseConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    type: ProjectSettingsActionNames.RemoveDatabaseConnectionGroup;
}

export interface RemoveOutputPathAction {
    outputPath: IOutputPath;
    type: ProjectSettingsActionNames.RemoveOutputPathAction;
}

export type KnownProjectSettingsAction = AddOrUpdateDatabaseConnectionGroupAction
    | AddOrUpdateLocalPackageFolderAction
    | AddOrUpdateOutputPathAction
    | AddOrUpdateRemotePackageLocationAction
    | RemoveDatabaseConnectionGroupAction
    | RemoveOutputPathAction;

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
    addOrUpdateOutputPath: (outputPath: IOutputPath) => {
        return <AddOrUpdateOutputPathAction>{
            outputPath: outputPath,
            type: ProjectSettingsActionNames.AddOrUpdateOutputPathAction
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
    removeOutputPath: (outputPath: IOutputPath) => {
        return <RemoveOutputPathAction>{
            outputPath: outputPath,
            type: ProjectSettingsActionNames.RemoveOutputPathAction
        };
    },
};