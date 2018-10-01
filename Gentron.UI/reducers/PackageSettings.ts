import { Action, Reducer } from 'redux';
import { PackageSettings, IPackageSettings } from "../../Gentron.Library";
import * as PackageSettingsActions from '../actions/PackageSettings';
import { PackageSettingsActionNames } from "../constants/ActionNames";
import { AddOrUpdatePackageNameAction, AddOrUpdateReadMeTextAction } from '../actions/PackageSettings';

const _unloadedPackageSettingsState: IPackageSettings = new PackageSettings();

export const reducer: Reducer<IPackageSettings> = (state: IPackageSettings, action: PackageSettingsActions.KnownPackageSettingsAction) => {
    switch (action.type) {
        case PackageSettingsActionNames.AddOrUpdatePackageName:
            return {
                PackageName: (action as AddOrUpdatePackageNameAction).packageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.AddOrUpdateReadMeText:
            return {
                PackageName: state.PackageName,
                ReadMeText: (action as AddOrUpdateReadMeTextAction).readMeText,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedPackageSettingsState;
};