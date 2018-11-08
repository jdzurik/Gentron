import { DEFAULT_PACKAGE_NAME, DEFAULT_LOCAL_PACKAGE_FOLDER } from "./Gentron";

export const PACKAGE_LOCAL_FOLDER_NULL: string = `The local package folder was not specified. Package file was written to "{PROJECT_FILE_DIRECTORY}/{PACKAGE_NAME}/${DEFAULT_PACKAGE_NAME}"`;
export const LOCAL_PACKAGE_FOLDER_NOT_FOUND: string = 'The local package folder was not found, package settings have been reset.';
export const PACKAGE_FOLDER_AND_NAME_NULL: string = `Neither the local package folder nor the package name was specified. Package file was written to "{PROJECT_FILE_DIRECTORY}/${DEFAULT_LOCAL_PACKAGE_FOLDER}/${DEFAULT_PACKAGE_NAME}"`;