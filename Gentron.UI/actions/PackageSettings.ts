import { PackageSettingsActionNames } from "../constants/ActionNames";
import { ChangeEvent } from 'react';
import { IDatabaseSource } from '../../Gentron.Library/DatabaseSource';
import { IFileSource, IHttpSource } from '../../Gentron.Library';

export interface AddOrUpdateDatabaseSourceAction {
    databaseSource: IDatabaseSource;
    type: PackageSettingsActionNames.AddOrUpdateDatabaseSource;
}

export interface AddOrUpdateFileSourceAction {
    fileSource: IFileSource;
    type: PackageSettingsActionNames.AddOrUpdateFileSource;
}

export interface AddOrUpdateHttpSourceAction {
    httpSource: IHttpSource;
    type: PackageSettingsActionNames.AddOrUpdateHttpSource;
}

export interface AddOrUpdatePackageNameAction {
    packageName: string;
    type: PackageSettingsActionNames.AddOrUpdatePackageName;
}

export interface AddOrUpdateReadMeTextAction {
    readMeText: string;
    type: PackageSettingsActionNames.AddOrUpdateReadMeText;
}

export interface RemoveDatabaseSourceAction {
    databaseSource: IDatabaseSource;
    type: PackageSettingsActionNames.RemoveDatabaseSource;
}

export interface RemoveFileSourceAction {
    fileSource: IFileSource;
    type: PackageSettingsActionNames.RemoveFileSource;
}

export interface RemoveHttpSourceAction {
    httpSource: IHttpSource;
    type: PackageSettingsActionNames.RemoveHttpSource;
}

export type KnownPackageSettingsAction = AddOrUpdateDatabaseSourceAction
    | AddOrUpdateFileSourceAction
    | AddOrUpdateHttpSourceAction
    | AddOrUpdatePackageNameAction
    | AddOrUpdateReadMeTextAction
    | RemoveDatabaseSourceAction
    | RemoveFileSourceAction
    | RemoveHttpSourceAction;

export const ActionCreators = {
    addOrUpdateDatabaseSource: (databaseSource: IDatabaseSource) => {
        return <AddOrUpdateDatabaseSourceAction>{
            databaseSource: databaseSource,
            type: PackageSettingsActionNames.AddOrUpdateDatabaseSource
        };
    },
    addOrUpdateFileSource: (fileSource: IFileSource) => {
        return <AddOrUpdateFileSourceAction>{
            fileSource: fileSource,
            type: PackageSettingsActionNames.AddOrUpdateFileSource
        };
    },
    addOrUpdateHttpSource: (httpSource: IHttpSource) => {
        return <AddOrUpdateHttpSourceAction>{
            httpSource: httpSource,
            type: PackageSettingsActionNames.AddOrUpdateHttpSource
        };
    },
    addOrUpdatePackageName: (ev?: ChangeEvent<HTMLInputElement>) => {
        return <AddOrUpdatePackageNameAction>{
            packageName: ev ? ev.target.value : "",
            type: PackageSettingsActionNames.AddOrUpdatePackageName
        };
    },
    addOrUpdateReadMeText: (ev?: ChangeEvent<HTMLInputElement>) => {
        return <AddOrUpdateReadMeTextAction>{
            readMeText: ev ? ev.target.value : "",
            type: PackageSettingsActionNames.AddOrUpdateReadMeText
        };
    },
    removeDatabaseSource: (databaseSource: IDatabaseSource) => {
        return <RemoveDatabaseSourceAction>{
            databaseSource: databaseSource,
            type: PackageSettingsActionNames.RemoveDatabaseSource
        };
    },
    removeFileSource: (fileSource: IFileSource) => {
        return <RemoveFileSourceAction>{
            fileSource: fileSource,
            type: PackageSettingsActionNames.RemoveFileSource
        };
    },
    removeHttpSource: (httpSource: IHttpSource) => {
        return <RemoveHttpSourceAction>{
            httpSource: httpSource,
            type: PackageSettingsActionNames.RemoveHttpSource
        };
    },
};