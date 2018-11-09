import { DatabaseSource, Engine, FileSource, HttpSource, ITemplate, Environment } from '../../Gentron.Library';
import { PackageSettingsActionNames } from "../constants/ActionNames";

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
    template: ITemplate;
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
    template: ITemplate;
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
    | RemoveDatabaseSourceAction
    | RemoveEngineAction
    | RemoveEngineTemplateAction
    | RemoveEnvironmentAction
    | RemoveFileSourceAction
    | RemoveHttpSourceAction
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
    addOrUpdateEngineTemplate: (engineId: string, template: ITemplate) => {
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
    removeEngineTemplate: (engineId: string, template: ITemplate) => {
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
    toggleActiveEnvironment: (environment: Environment) => {
        return <ToggleActiveEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.ToggleActiveEnvironment
        };
    },
};