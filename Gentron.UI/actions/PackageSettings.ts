import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { PackageSettingsActionNames } from "../constants/ActionNames";
import { ChangeEvent } from 'react';

export interface AddOrUpdatePackageNameAction {
    packageName: string;
    type: PackageSettingsActionNames.AddOrUpdatePackageName;
}

export interface AddOrUpdateReadMeTextAction {
    readMeText: string;
    type: PackageSettingsActionNames.AddOrUpdateReadMeText;
}

export type KnownPackageSettingsAction = AddOrUpdatePackageNameAction | AddOrUpdateReadMeTextAction;

export const ActionCreators = {
    addOrUpdatePackageName: (ev?: ChangeEvent<HTMLInputElement>)/*: AppThunkAction<KnownPackageSettingsAction> => (dispatch, getState)*/ => {
        return <AddOrUpdatePackageNameAction>{
            packageName: ev ? ev.target.value : "",
            type: PackageSettingsActionNames.AddOrUpdatePackageName
        };
    },
    addOrUpdateReadMeText: (ev?: ChangeEvent<HTMLInputElement>)/*: AppThunkAction<KnownPackageSettingsAction> => (dispatch, getState)*/ => {
        return <AddOrUpdateReadMeTextAction>{
            readMeText: ev ? ev.target.value : "",
            type: PackageSettingsActionNames.AddOrUpdateReadMeText
        };
    },
};