import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ProjectSettingsActionNames } from "../constants/ActionNames";
import { ChangeEvent } from 'react';

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

export type KnownProjectSettingsAction = AddOrUpdateLocalPackageFolderAction | AddOrUpdateOutputCodeFolderAction | AddOrUpdateRemotePackageLocationAction;

export const ActionCreators = {
    addOrUpdateLocalPackageFolder: (ev?: ChangeEvent<HTMLInputElement>)/*: AppThunkAction<KnownProjectSettingsAction> => (dispatch, getState)*/ => {
        return <AddOrUpdateLocalPackageFolderAction>{
            localPackageFolder: ev ? ev.target.value : "",
            type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction
        };
    },
    addOrUpdateOutputCodeFolder: (ev?: ChangeEvent<HTMLInputElement>)/*: AppThunkAction<KnownProjectSettingsAction> => (dispatch, getState)*/ => {
        return <AddOrUpdateOutputCodeFolderAction>{
            outputCodeFolder: ev ? ev.target.value : "",
            type: ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction
        };
    },
    addOrUpdateRemotePackageLocation: (ev?: ChangeEvent<HTMLInputElement>)/*: AppThunkAction<KnownProjectSettingsAction> => (dispatch, getState)*/ => {
        return <AddOrUpdateRemotePackageLocationAction>{
            remotePackageLocation: ev ? ev.target.value : "",
            type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction
        };
    }
};