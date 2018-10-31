import { IConnectionGroup, IDatabaseConnection, IOutputPath, IOutputPathGroup } from '../../Gentron.Library';
import { ProjectSettingsActionNames } from "../constants/ActionNames";

export interface AddOrUpdateDatabaseConnectionGroupAction {
    databaseConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    type: ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup;
}

export interface AddOrUpdateLocalPackageFolderAction {
    localPackageFolder: string;
    type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction;
}

export interface AddOrUpdateOutputPathGroupAction {
    outputPathGroup: IOutputPathGroup<IOutputPath>;
    type: ProjectSettingsActionNames.AddOrUpdateOutputPathGroupAction;
}

export interface AddOrUpdateRemotePackageLocationAction {
    remotePackageLocation: string;
    type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction;
}

export interface RemoveDatabaseConnectionGroupAction {
    databaseConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    type: ProjectSettingsActionNames.RemoveDatabaseConnectionGroup;
}

export interface RemoveOutputPathGroupAction {
    outputPathGroup: IOutputPathGroup<IOutputPath>;
    type: ProjectSettingsActionNames.RemoveOutputPathGroupAction;
}

export type KnownProjectSettingsAction = AddOrUpdateDatabaseConnectionGroupAction
    | AddOrUpdateLocalPackageFolderAction
    | AddOrUpdateOutputPathGroupAction
    | AddOrUpdateRemotePackageLocationAction
    | RemoveDatabaseConnectionGroupAction
    | RemoveOutputPathGroupAction;

export const ActionCreators = {
    addOrUpdateDatabaseConnectionGroup: (databaseSource: IConnectionGroup<IDatabaseConnection>) => {
        return <AddOrUpdateDatabaseConnectionGroupAction>{
            databaseConnectionGroup: databaseSource,
            type: ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup
        };
    },
    addOrUpdateLocalPackageFolder: (localPackageFolder?: string) => {
        return <AddOrUpdateLocalPackageFolderAction>{
            localPackageFolder: localPackageFolder,
            type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction
        };
    },
    addOrUpdateOutputPathGroup: (outputPathGroup: IOutputPathGroup<IOutputPath>) => {
        return <AddOrUpdateOutputPathGroupAction>{
            outputPathGroup: outputPathGroup,
            type: ProjectSettingsActionNames.AddOrUpdateOutputPathGroupAction
        };
    },
    addOrUpdateRemotePackageLocation: (remotePackageLocation?: string) => {
        return <AddOrUpdateRemotePackageLocationAction>{
            remotePackageLocation: remotePackageLocation,
            type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction
        };
    },
    removeDatabaseConnectionGroup: (databaseSource: IConnectionGroup<IDatabaseConnection>) => {
        return <RemoveDatabaseConnectionGroupAction>{
            databaseConnectionGroup: databaseSource,
            type: ProjectSettingsActionNames.RemoveDatabaseConnectionGroup
        };
    },
    removeOutputPathGroup: (outputPathGroup: IOutputPathGroup<IOutputPath>) => {
        return <RemoveOutputPathGroupAction>{
            outputPathGroup: outputPathGroup,
            type: ProjectSettingsActionNames.RemoveOutputPathGroupAction
        };
    },
};