export const enum PackageSettingsActionNames {
    AddOrUpdateDatabaseSource = "ADD_OR_UPDATE_DATABASE_SOURCE",
    AddOrUpdateFileSource = "ADD_OR_UPDATE_FILE_SOURCE",
    AddOrUpdateHttpSource = "ADD_OR_UPDATE_HTTP_SOURCE",
    AddOrUpdatePackageName = "ADD_OR_UPDATE_PACKAGE_NAME",
    AddOrUpdateReadMeText = "ADD_OR_UPDATE_READ_ME_TEXT",
    RemoveDatabaseSource = "REMOVE_DATABASE_SOURCE",
    RemoveFileSource = "REMOVE_FILE_SOURCE",
    RemoveHttpSource = "REMOVE_HTTP_SOURCE",
}


export const enum ProjectSettingsActionNames {
    AddOrUpdateDatabaseConnectionGroup = "ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP",
    AddOrUpdateLocalPackageFolderAction = "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER",
    AddOrUpdateOutputCodeFolderAction = "ADD_OR_UPDATE_OUTPUT_CODE_FOLDER",
    AddOrUpdateRemotePackageLocationAction = "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION",
    RemoveDatabaseConnectionGroup = "REMOVE_DATABASE_CONNECTION_GROUP",
}