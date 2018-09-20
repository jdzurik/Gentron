import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

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
    addOrUpdateLocalPackageFolder: (localPackageFolder: string): AppThunkAction<KnownProjectSettingsAction> => (dispatch, getState) => {
        console.log("addOrUpdateLocalPackageFolder: " + localPackageFolder);
        return <AddOrUpdateLocalPackageFolderAction>{
            localPackageFolder: localPackageFolder,
            type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction
        };
    },
    addOrUpdateOutputCodeFolder: (outputCodeFolder: string): AppThunkAction<KnownProjectSettingsAction> => (dispatch, getState) => {
        console.log("addOrUpdateOutputCodeFolder: " + outputCodeFolder);
        return <AddOrUpdateOutputCodeFolderAction>{
            outputCodeFolder: outputCodeFolder,
            type: ProjectSettingsActionNames.AddOrUpdateOutputCodeFolderAction
        };
    },
    addOrUpdateRemotePackageLocation: (remotePackageLocation: string): AppThunkAction<KnownProjectSettingsAction> => (dispatch, getState) => {
        console.log("addOrUpdateRemotePackageLocation: " + remotePackageLocation);
        return <AddOrUpdateRemotePackageLocationAction>{
            remotePackageLocation: remotePackageLocation,
            type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction
        };
    }
};