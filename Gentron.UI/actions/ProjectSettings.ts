import { ConnectionGroup, DatabaseConnection, IOutputPath, IOutputPathGroup } from '../../Gentron.Library';
import { ProjectSettingsActionNames } from "../constants/ActionNames";

export interface AddOrUpdateDatabaseConnectionGroupAction {
    databaseConnectionGroup: ConnectionGroup<DatabaseConnection>;
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
    databaseConnectionGroup: ConnectionGroup<DatabaseConnection>;
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
    addOrUpdateDatabaseConnectionGroup: (databaseSource: ConnectionGroup<DatabaseConnection>) => {
        return <AddOrUpdateDatabaseConnectionGroupAction>{
            databaseConnectionGroup: databaseSource,
            type: ProjectSettingsActionNames.AddOrUpdateDatabaseConnectionGroup
        };
    },
    addOrUpdateLocalPackageFolder: (value?: string) => {
        return <AddOrUpdateLocalPackageFolderAction>{
            localPackageFolder: value || "",
            type: ProjectSettingsActionNames.AddOrUpdateLocalPackageFolderAction
        };
    },
    addOrUpdateOutputPathGroup: (outputPathGroup: IOutputPathGroup<IOutputPath>) => {
        return <AddOrUpdateOutputPathGroupAction>{
            outputPathGroup: outputPathGroup,
            type: ProjectSettingsActionNames.AddOrUpdateOutputPathGroupAction
        };
    },
    addOrUpdateRemotePackageLocation: (value: string) => {
        return <AddOrUpdateRemotePackageLocationAction>{
            remotePackageLocation: value,
            type: ProjectSettingsActionNames.AddOrUpdateRemotePackageLocationAction
        };
    },
    removeDatabaseConnectionGroup: (databaseSource: ConnectionGroup<DatabaseConnection>) => {
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