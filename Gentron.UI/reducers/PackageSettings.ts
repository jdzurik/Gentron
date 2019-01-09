import * as PackageSettingsActions from '../actions/PackageSettings';
import { NonFunctionProperties } from "../../Gentron.Library/types";
import { PackageSettings, Environment } from "../../Gentron.Library";
import { PackageSettingsActionNames } from "../constants/ActionNames";
import { Reducer } from 'redux';
import SourceBase from '../../Gentron.Library/SourceBase';

type PackageSettingsProps = NonFunctionProperties<PackageSettings>;

const _unloadedPackageSettingsState: PackageSettingsProps = new PackageSettings() as PackageSettingsProps;

export const reducer: Reducer<PackageSettingsProps> = (state: PackageSettingsProps, action: PackageSettingsActions.KnownPackageSettingsAction) => {
    switch (action.type) {
        case PackageSettingsActionNames.AddOrUpdateDatabaseSource:
            let dbSourceFound: boolean = false;
            for (let i: number = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.source.ID) {
                    state.DatabaseSources[i].update(action.source);
                    dbSourceFound = true;
                    break;
                }
            }

            if (!dbSourceFound) {
                state.DatabaseSources.push(action.source);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdateEngine:
            let engineFound: boolean = false;
            for (let i: number = 0; i < state.Engines.length; ++i) {
                if (state.Engines[i].ID === action.source.ID) {
                    state.Engines[i].update(action.source /*, action.dirname, action.localPackageFolder */);
                    engineFound= true;
                    break;
                }
            }

            if (!engineFound) {
                state.Engines.push(action.source);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdateEngineTemplate:
            const engineId: number = parseInt(action.engineId, 10);
            let templateFound: boolean = false;
            for (let i: number = 0; i < state.Engines[engineId].Templates.length; ++i) {
                if (state.Engines[engineId].Templates[i].ID === action.template.ID) {
                    state.Engines[engineId].Templates[i].update(action.template);
                    templateFound = true;
                    break;
                }
            }

            if (!templateFound) {
                state.Engines[engineId].Templates.push(action.template);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdateEnvironment:
            let environmentFound: boolean = false;
            for (let i: number = 0; i < state.Environments.length; ++i) {
                if (state.Environments[i].ID === action.environment.ID) {
                    state.Environments[i].update(action.environment);
                    environmentFound = true;
                    break;
                }
            }

            if (!environmentFound) {
                state.Environments.push(action.environment);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdateFileSource:
            let fileSourceFound: boolean = false;
            for (let i: number = 0; i < state.FileSources.length; ++i) {
                if (state.FileSources[i].ID === action.source.ID) {
                    state.FileSources[i].update(action.source);
                    fileSourceFound = true;
                    break;
                }
            }

            if (!fileSourceFound) {
                state.FileSources.push(action.source);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdateHttpSource:
            let httpSourceFound: boolean = false;
            for (let i: number = 0; i < state.HttpSources.length; ++i) {
                if (state.HttpSources[i].ID === action.source.ID) {
                    state.HttpSources[i].update(action.source);
                    httpSourceFound = true;
                    break;
                }
            }

            if (!httpSourceFound) {
                state.HttpSources.push(action.source);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdatePackageName:
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: action.packageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.AddOrUpdateReadMeText:
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: action.readMeText,
            };
        case PackageSettingsActionNames.ExecuteDatabaseSourceQueryStart:
            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.ExecuteDatabaseSourceQueryComplete:
            for (let i: number = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.source.ID) {
                    state.DatabaseSources[i].update(action.source);
                }
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.RemoveDatabaseSource:
            let dbSourceIdx: number = -1;
            for (let i: number = 0; i < state.DatabaseSources.length; ++i) {
                if (state.DatabaseSources[i].ID === action.source.ID) {
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
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.RemoveEngine:
            let engineIdx: number = -1;
            for (let i: number = 0; i < state.Engines.length; ++i) {
                if (state.Engines[i].ID === action.source.ID) {
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
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.RemoveEngineTemplate:
            let engineTemplateIdx: number = -1;
            const removeEngineId: number = parseInt(action.engineId, 10);
            for (let i: number = 0; i < state.Engines[removeEngineId].Templates.length; ++i) {
                if (state.Engines[removeEngineId].Templates[i].ID === action.template.ID) {
                    engineTemplateIdx = i;
                    break;
                }
            }

            if (engineTemplateIdx >= 0) {
                state.Engines[removeEngineId].Templates.splice(engineTemplateIdx, 1);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.RemoveEnvironment:
            let environmentIdx: number = -1;
            for (let i: number = 0; i < state.Environments.length; ++i) {
                if (state.Environments[i].ID === action.environment.ID) {
                    environmentIdx = i;
                    break;
                }
            }

            if (environmentIdx >= 0) {
                state.Environments.splice(environmentIdx, 1);
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.RemoveFileSource:
            let fileSourceIdx: number = -1;
            for (let i: number = 0; i < state.FileSources.length; ++i) {
                if (state.FileSources[i].ID === action.source.ID) {
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
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.RemoveHttpSource:
            let httpSourceIdx: number = -1;
            for (let i: number = 0; i < state.HttpSources.length; ++i) {
                if (state.HttpSources[i].ID === action.source.ID) {
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
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.SwapPackageItemSourceOrder:
            const swapArray = action.array;
            const swapIndex: number = action.index;
            const swapDirection: string = action.direction;

            if (swapDirection === 'down' && (swapIndex >= 0 && swapIndex < (swapArray.length - 1))) {
                const source = swapArray[swapIndex];
                const swap = swapArray[swapIndex + 1];
                swapArray[swapIndex] = swap;
                swapArray[swapIndex + 1] = source;
            }
            else if (swapDirection === 'up' && (swapIndex > 0 && swapIndex <= (swapArray.length - 1))) {
                const source = swapArray[swapIndex];
                const swap = swapArray[swapIndex - 1];
                swapArray[swapIndex] = swap;
                swapArray[swapIndex - 1] = source;
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        case PackageSettingsActionNames.ToggleActiveEnvironment:
            for (let i: number = 0; i < state.Environments.length; ++i) {
                const environment: Environment = state.Environments[i];

                if (environment.ID === action.environment.ID) {
                    environment.update(action.environment);
                }
                else {
                    environment.IsActive = false;
                    environment.update(environment);
                }
            }

            return {
                DatabaseSources: state.DatabaseSources,
                Engines: state.Engines,
                Environments: state.Environments,
                FileSources: state.FileSources,
                HttpSources: state.HttpSources,
                PackageName: state.PackageName,
                ReadMe: state.ReadMe,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action as never;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || _unloadedPackageSettingsState;
};