export const enum GentronActionNames {
    AddOrUpdateActiveProjectPath = 'ADD_OR_UPDATE_ACTIVE_PROJECT_PATH',
    OpenProject = 'OPEN_PROJECT',
}

export const enum PackageSettingsActionNames {
    AddOrUpdateDatabaseSource = 'ADD_OR_UPDATE_DATABASE_SOURCE',
    AddOrUpdateEngine = 'ADD_OR_UPDATE_ENGINE',
    AddOrUpdateEngineTemplate = 'ADD_OR_UPDATE_ENGINE_TEMPLATE',
    AddOrUpdateEnvironment = 'ADD_OR_UPDATE_ENVIRONMENT',
    AddOrUpdateFileSource = 'ADD_OR_UPDATE_FILE_SOURCE',
    AddOrUpdateHttpSource = 'ADD_OR_UPDATE_HTTP_SOURCE',
    AddOrUpdatePackageName = 'ADD_OR_UPDATE_PACKAGE_NAME',
    AddOrUpdateReadMeText = 'ADD_OR_UPDATE_READ_ME_TEXT',
    ExecuteDatabaseSourceQueryStart = 'EXECUTE_DATABASE_SOUCE_QUERY_START',
    ExecuteDatabaseSourceQueryComplete = 'EXECUTE_DATABASE_SOUCE_QUERY_COMPLETE',
    RemoveDatabaseSource = 'REMOVE_DATABASE_SOURCE',
    RemoveEngine = 'REMOVE_ENGINE',
    RemoveEngineTemplate = 'REMOVE_ENGINE_TEMPLATE',
    RemoveEnvironment = 'REMOVE_ENVIRONMENT',
    RemoveFileSource = 'REMOVE_FILE_SOURCE',
    RemoveHttpSource = 'REMOVE_HTTP_SOURCE',
    SwapPackageItemSourceOrder = 'SWAP_PACKAGE_ITEM_SOURCE_ORDER',
    ToggleActiveEnvironment = 'TOGGLE_ACTIVE_ENVIRONMENT',
}


export const enum ProjectSettingsActionNames {
    AddOrUpdateDatabaseConnectionGroup = 'ADD_OR_UPDATE_DATABASE_CONNECTION_GROUP',
    AddOrUpdateLocalPackageFolderAction = 'ADD_OR_UPDATE_LOCAL_PACKAGE_FOLDER',
    AddOrUpdateOutputPathGroupAction = 'ADD_OR_UPDATE_OUTPUT_PATH_GROUP',
    AddOrUpdateRemotePackageLocationAction = 'ADD_OR_UPDATE_REMOTE_PACKAGE_LOCATION',
    RemoveDatabaseConnectionGroup = 'REMOVE_DATABASE_CONNECTION_GROUP',
    RemoveOutputPathGroupAction = 'REMOVE_OUTPUT_PATH_GROUP',
    SwapProjectItemSourceOrder = 'SWAP_PROJECT_ITEM_SOURCE_ORDER',
}