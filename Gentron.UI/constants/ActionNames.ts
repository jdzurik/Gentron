export const enum PackageSettingsActionNames {
    AddOrUpdateDatabaseSource = "ADD_OR_UPDATE_DATABASE_SOURCE",
    AddOrUpdateEngine = "ADD_OR_UPDATE_ENGINE",
    AddOrUpdateEngineTemplate = "ADD_OR_UPDATE_ENGINE_TEMPLATE",
    AddOrUpdateEnvironment = "ADD_OR_UPDATE_ENVIRONMENT",
    AddOrUpdateFileSource = "ADD_OR_UPDATE_FILE_SOURCE",
    AddOrUpdateHttpSource = "ADD_OR_UPDATE_HTTP_SOURCE",
    AddOrUpdatePackageName = "ADD_OR_UPDATE_PACKAGE_NAME",
    AddOrUpdateReadMeText = "ADD_OR_UPDATE_READ_ME_TEXT",
    RemoveDatabaseSource = "REMOVE_DATABASE_SOURCE",
    RemoveEngine = "REMOVE_ENGINE",
    RemoveEngineTemplate = "REMOVE_ENGINE_TEMPLATE",
    RemoveEnvironment = "REMOVE_ENVIRONMENT",
    RemoveFileSource = "REMOVE_FILE_SOURCE",
    RemoveHttpSource = "REMOVE_HTTP_SOURCE",
    ToggleActiveEnvironment = "TOGGLE_ACTIVE_ENVIRONMENT",
}


export const enum ProjectSettingsActionNames {
    AddOrUpdateDatabaseConnectionGroup = "ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP",
    AddOrUpdateLocalPackageFolderAction = "ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER",
    AddOrUpdateOutputPathAction = "ADD_OR_UPDATE_OUTPUT_PATH",
    AddOrUpdateRemotePackageLocationAction = "ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION",
    RemoveDatabaseConnectionGroup = "REMOVE_DATABASE_CONNECTION_GROUP",
    RemoveOutputPathAction = "REMOVE_OUTPUT_PATH",
}