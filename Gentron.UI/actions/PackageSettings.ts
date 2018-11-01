import { IDatabaseSource } from '../../Gentron.Library/DatabaseSource';
import { IEngine, IFileSource, IHttpSource, ITemplate, IEnvironment } from '../../Gentron.Library';
import { PackageSettingsActionNames } from "../constants/ActionNames";

export interface AddOrUpdateDatabaseSourceAction {
    databaseSource: IDatabaseSource;
    type: PackageSettingsActionNames.AddOrUpdateDatabaseSource;
}

export interface AddOrUpdateEngineAction {
    engine: IEngine;
    type: PackageSettingsActionNames.AddOrUpdateEngine;
}

export interface AddOrUpdateEngineTemplateAction {
    engineId: string;
    template: ITemplate;
    type: PackageSettingsActionNames.AddOrUpdateEngineTemplate;
}

export interface AddOrUpdateEnvironmentAction {
    environment: IEnvironment;
    type: PackageSettingsActionNames.AddOrUpdateEnvironment;
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

export interface RemoveEngineAction {
    engine: IEngine;
    type: PackageSettingsActionNames.RemoveEngine;
}

export interface RemoveEngineTemplateAction {
    engineId: string;
    template: ITemplate;
    type: PackageSettingsActionNames.RemoveEngineTemplate;
}

export interface RemoveEnvironmentAction {
    environment: IEnvironment;
    type: PackageSettingsActionNames.RemoveEnvironment;
}

export interface RemoveFileSourceAction {
    fileSource: IFileSource;
    type: PackageSettingsActionNames.RemoveFileSource;
}

export interface RemoveHttpSourceAction {
    httpSource: IHttpSource;
    type: PackageSettingsActionNames.RemoveHttpSource;
}

export interface ToggleActiveEnvironmentAction {
    environment: IEnvironment;
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
    addOrUpdateDatabaseSource: (databaseSource: IDatabaseSource) => {
        return <AddOrUpdateDatabaseSourceAction>{
            databaseSource: databaseSource,
            type: PackageSettingsActionNames.AddOrUpdateDatabaseSource
        };
    },
    addOrUpdateEngine: (engine: IEngine) => {
        return <AddOrUpdateEngineAction>{
            engine: engine,
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
    addOrUpdateEnvironment: (environment: IEnvironment) => {
        return <AddOrUpdateEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.AddOrUpdateEnvironment
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
    removeDatabaseSource: (databaseSource: IDatabaseSource) => {
        return <RemoveDatabaseSourceAction>{
            databaseSource: databaseSource,
            type: PackageSettingsActionNames.RemoveDatabaseSource
        };
    },
    removeEngine: (engine: IEngine) => {
        return <RemoveEngineAction>{
            engine: engine,
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
    removeEnvironment: (environment: IEnvironment) => {
        return <RemoveEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.RemoveEnvironment
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
    toggleActiveEnvironment: (environment: IEnvironment) => {
        return <ToggleActiveEnvironmentAction>{
            environment: environment,
            type: PackageSettingsActionNames.ToggleActiveEnvironment
        };
    },
};