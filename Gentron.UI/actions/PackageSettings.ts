import { DatabaseSource, Engine, Environment, FileSource, HttpSource, Template } from '../../Gentron.Library';
import { PackageSettingsActionNames } from "../constants/ActionNames";
import SourceBase from '../../Gentron.Library/SourceBase';
import { SwapSourcesDirection } from '../../Gentron.Library/types';
import { Dispatch } from 'redux';

export interface AddOrUpdateDatabaseSourceAction {
    source: DatabaseSource;
    type: PackageSettingsActionNames.AddOrUpdateDatabaseSource;
}

export interface AddOrUpdateEngineAction {
    source: Engine;
    type: PackageSettingsActionNames.AddOrUpdateEngine;
}

export interface AddOrUpdateEngineTemplateAction {
    engineId: string;
    template: Template;
    type: PackageSettingsActionNames.AddOrUpdateEngineTemplate;
}

export interface AddOrUpdateEnvironmentAction {
    environment: Environment;
    type: PackageSettingsActionNames.AddOrUpdateEnvironment;
}

export interface AddOrUpdateFileSourceAction {
    source: FileSource;
    type: PackageSettingsActionNames.AddOrUpdateFileSource;
}

export interface AddOrUpdateHttpSourceAction {
    source: HttpSource;
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

export interface ExecuteDatabaseSourceQueryStartAction {
    source: DatabaseSource;
    type: PackageSettingsActionNames.ExecuteDatabaseSourceQueryStart;
}

export interface ExecuteDatabaseSourceQueryCompleteAction {
    source: DatabaseSource;
    type: PackageSettingsActionNames.ExecuteDatabaseSourceQueryComplete;
}

export interface RemoveDatabaseSourceAction {
    source: DatabaseSource;
    type: PackageSettingsActionNames.RemoveDatabaseSource;
}

export interface RemoveEngineAction {
    source: Engine;
    type: PackageSettingsActionNames.RemoveEngine;
}

export interface RemoveEngineTemplateAction {
    engineId: string;
    template: Template;
    type: PackageSettingsActionNames.RemoveEngineTemplate;
}

export interface RemoveEnvironmentAction {
    environment: Environment;
    type: PackageSettingsActionNames.RemoveEnvironment;
}

export interface RemoveFileSourceAction {
    source: FileSource;
    type: PackageSettingsActionNames.RemoveFileSource;
}

export interface RemoveHttpSourceAction {
    source: HttpSource;
    type: PackageSettingsActionNames.RemoveHttpSource;
}



export interface SwapPackageItemSourceOrderAction<TPackageItem extends SourceBase<TPackageItem>> {
    array: Array<TPackageItem>;
    index: number;
    direction: SwapSourcesDirection;
    type: PackageSettingsActionNames.SwapPackageItemSourceOrder;
}

export interface ToggleActiveEnvironmentAction {
    environment: Environment;
    type: PackageSettingsActionNames.ToggleActiveEnvironment;
}

export type KnownPackageSettingsAction = AddOrUpdateDatabaseSourceAction
    | AddOrUpdateEngineAction
    | AddOrUpdateEngineTemplateAction
    | AddOrUpdateEnvironmentAction
    | AddOrUpdateFileSourceAction
    | AddOrUpdateHttpSourceAction
    | AddOrUpdatePackageNameAction
    | AddOrUpdateReadMeTextAction
    | ExecuteDatabaseSourceQueryStartAction
    | ExecuteDatabaseSourceQueryCompleteAction
    | RemoveDatabaseSourceAction
    | RemoveEngineAction
    | RemoveEngineTemplateAction
    | RemoveEnvironmentAction
    | RemoveFileSourceAction
    | RemoveHttpSourceAction
    | SwapPackageItemSourceOrderAction<any>
    | ToggleActiveEnvironmentAction;

export const ActionCreators = {
    addOrUpdateDatabaseSource: (source: DatabaseSource) => {
        return <AddOrUpdateDatabaseSourceAction>{
            source: source,
            type: PackageSettingsActionNames.AddOrUpdateDatabaseSource
        };
    },
    addOrUpdateEngine: (source: Engine) => {
        return <AddOrUpdateEngineAction>{
            source: source,
            type: PackageSettingsActionNames.AddOrUpdateEngine
        };
    },
    addOrUpdateEngineTemplate: (engineId: string, template: Template) => {
        return <AddOrUpdateEngineTemplateAction>{
            engineId: engineId,
            template: template,
            type: PackageSettingsActionNames.AddOrUpdateEngineTemplate
        };
    },
    addOrUpdateEnvironment: (environment: Environment) => {
        return <AddOrUpdateEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.AddOrUpdateEnvironment
        };
    },
    addOrUpdateFileSource: (source: FileSource) => {
        return <AddOrUpdateFileSourceAction>{
            source: source,
            type: PackageSettingsActionNames.AddOrUpdateFileSource
        };
    },
    addOrUpdateHttpSource: (httpSource: HttpSource) => {
        return <AddOrUpdateHttpSourceAction>{
            source: httpSource,
            type: PackageSettingsActionNames.AddOrUpdateHttpSource
        };
    },
    addOrUpdatePackageName: (packageName: string) => {
        return <AddOrUpdatePackageNameAction>{
            packageName: packageName,
            type: PackageSettingsActionNames.AddOrUpdatePackageName
        };
    },
    addOrUpdateReadMeText: (readMeText: string) => {
        return <AddOrUpdateReadMeTextAction>{
            readMeText: readMeText,
            type: PackageSettingsActionNames.AddOrUpdateReadMeText
        };
    },
    executeDatabaseSourceQuery: (source: DatabaseSource) => {
        return (dispatch: Dispatch) => {
            dispatch({ type: PackageSettingsActionNames.ExecuteDatabaseSourceQueryStart });

            source.executeScript()
                .then(() => {
                    dispatch(
                        <ExecuteDatabaseSourceQueryCompleteAction>
                        {
                            type: PackageSettingsActionNames.ExecuteDatabaseSourceQueryComplete,
                            source: source
                        });
                })
                .catch((err) => {
                    dispatch(
                        <ExecuteDatabaseSourceQueryCompleteAction>
                        {
                            type: PackageSettingsActionNames.ExecuteDatabaseSourceQueryComplete,
                            source: source
                        });
                });
        };
    },
    removeDatabaseSource: (source: DatabaseSource) => {
        return <RemoveDatabaseSourceAction>{
            source: source,
            type: PackageSettingsActionNames.RemoveDatabaseSource
        };
    },
    removeEngine: (source: Engine) => {
        return <RemoveEngineAction>{
            source: source,
            type: PackageSettingsActionNames.RemoveEngine
        };
    },
    removeEngineTemplate: (engineId: string, template: Template) => {
        return <RemoveEngineTemplateAction>{
            engineId: engineId,
            template: template,
            type: PackageSettingsActionNames.RemoveEngineTemplate
        };
    },
    removeEnvironment: (environment: Environment) => {
        return <RemoveEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.RemoveEnvironment
        };
    },
    removeFileSource: (source: FileSource) => {
        return <RemoveFileSourceAction>{
            source: source,
            type: PackageSettingsActionNames.RemoveFileSource
        };
    },
    removeHttpSource: (source: HttpSource) => {
        return <RemoveHttpSourceAction>{
            source: source,
            type: PackageSettingsActionNames.RemoveHttpSource
        };
    },
    swapProjectItemSourceOrder: <T extends SourceBase<T>>(array: T[], index: number, direction: SwapSourcesDirection) => {
        return <SwapPackageItemSourceOrderAction<T>>{
            array: array,
            index: index, 
            direction: direction,
            type: PackageSettingsActionNames.SwapPackageItemSourceOrder
        };
    },
    toggleActiveEnvironment: (environment: Environment) => {
        return <ToggleActiveEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.ToggleActiveEnvironment
        };
    },
};