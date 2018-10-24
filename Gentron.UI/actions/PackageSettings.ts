import { PackageSettingsActionNames } from "../constants/ActionNames";
import { ChangeEvent } from 'react';
import { IDatabaseSource } from '../../Gentron.Library/DatabaseSource';
import { IEngine, IFileSource, IHttpSource, ITemplate } from '../../Gentron.Library';

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

export interface RemoveFileSourceAction {
    fileSource: IFileSource;
    type: PackageSettingsActionNames.RemoveFileSource;
}

export interface RemoveHttpSourceAction {
    httpSource: IHttpSource;
    type: PackageSettingsActionNames.RemoveHttpSource;
}

export type KnownPackageSettingsAction = AddOrUpdateDatabaseSourceAction
    | AddOrUpdateEngineAction
    | AddOrUpdateEngineTemplateAction
    | AddOrUpdateFileSourceAction
    | AddOrUpdateHttpSourceAction
    | AddOrUpdatePackageNameAction
    | AddOrUpdateReadMeTextAction
    | RemoveDatabaseSourceAction
    | RemoveEngineAction
    | RemoveEngineTemplateAction
    | RemoveFileSourceAction
    | RemoveHttpSourceAction;

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