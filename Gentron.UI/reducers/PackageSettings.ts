import { Reducer } from 'redux';
import { PackageSettings, IPackageSettings } from "../../Gentron.Library";
import * as PackageSettingsActions from '../actions/PackageSettings';
import { PackageSettingsActionNames } from "../constants/ActionNames";
import { NonFunctionProperties } from '../types';

type PackageSettingsProps = NonFunctionProperties<IPackageSettings>;

const _unloadedPackageSettingsState: IPackageSettings = new PackageSettings();

export const reducer: Reducer<PackageSettingsProps> = (state: PackageSettingsProps, action: PackageSettingsActions.KnownPackageSettingsAction) => {
    switch (action.type) {
        case PackageSettingsActionNames.AddOrUpdateDatabaseSource:
            let dbSourceFound: boolean = false;
            for (let i: number = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.databaseSource.ID) {
                    state.DatabaseSources[i].update(action.databaseSource);
                    dbSourceFound = true;
                    break;
                }
            }

            if (!dbSourceFound) {
                state.DatabaseSources.push(action.databaseSource);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.AddOrUpdateEngine:
            let engineFound: boolean = false;
            for (let i: number = 0; i < state.Engines.length; ++i) {
                if (state.Engines[i].ID === action.engine.ID) {
                    state.Engines[i].update(action.engine);
                    engineFound= true;
                    break;
                }
            }

            if (!engineFound) {
                state.Engines.push(action.engine);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.AddOrUpdateFileSource:
            let fileSourceFound: boolean = false;
            for (let i: number = 0; i < state.FileSources.length; ++i) {
                if (state.FileSources[i].ID === action.fileSource.ID) {
                    state.FileSources[i].update(action.fileSource);
                    fileSourceFound = true;
                    break;
                }
            }

            if (!fileSourceFound) {
                state.FileSources.push(action.fileSource);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.AddOrUpdateHttpSource:
            let httpSourceFound: boolean = false;
            for (let i: number = 0; i < state.HttpSources.length; ++i) {
                if (state.HttpSources[i].ID === action.httpSource.ID) {
                    state.HttpSources[i].update(action.httpSource);
                    httpSourceFound = true;
                    break;
                }
            }

            if (!httpSourceFound) {
                state.HttpSources.push(action.httpSource);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.AddOrUpdatePackageName:
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: action.packageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.AddOrUpdateReadMeText:
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: action.readMeText,
            };
        case PackageSettingsActionNames.RemoveDatabaseSource:
            let dbSourceIdx: number = -1;
            for (let i: number = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.databaseSource.ID) {
                    dbSourceIdx = i;
                    break;
                }
            }

            if (dbSourceIdx >= 0) {
                state.DatabaseSources.splice(dbSourceIdx, 1);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.RemoveEngine:
            let engineIdx: number = -1;
            for (let i: number = 0; i < state.Engines.length; ++i) {
                if (state.Engines[i].ID === action.engine.ID) {
                    engineIdx = i;
                    break;
                }
            }

            if (engineIdx >= 0) {
                state.Engines.splice(engineIdx, 1);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.RemoveFileSource:
            let fileSourceIdx: number = -1;
            for (let i: number = 0; i < state.FileSources.length; ++i) {
                if (state.FileSources[i].ID === action.fileSource.ID) {
                    fileSourceIdx = i;
                    break;
                }
            }

            if (fileSourceIdx >= 0) {
                state.FileSources.splice(fileSourceIdx, 1);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        case PackageSettingsActionNames.RemoveHttpSource:
            let httpSourceIdx: number = -1;
            for (let i: number = 0; i < state.HttpSources.length; ++i) {
                if (state.HttpSources[i].ID === action.httpSource.ID) {
                    httpSourceIdx = i;
                    break;
                }
            }

            if (httpSourceIdx >= 0) {
                state.HttpSources.splice(httpSourceIdx, 1);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMeText: state.ReadMeText,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedPackageSettingsState;
};