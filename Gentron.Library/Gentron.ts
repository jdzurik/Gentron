import * as fs from "fs";
import * as path from "path";
import { Gentron as GentronConstants, InfoMessages } from "./constants";
import { IFileOperationResult, FileOperationResult, GentronFsResult, IGentronFsResult } from "./results";
import { IPackageSettings, IProjectSettings, PackageSettings, ProjectSettings, Utilities, File } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";

export interface IGentron {
    /*
     *  Properties & Fields 
     */
    ActiveProjectPath: string;
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

@JsonObject()
export class Gentron implements IGentron {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public ActiveProjectPath: string;

    @JsonProperty()
    @JsonElementType(PackageSettings)
    public PackageSettings: IPackageSettings;

    @JsonProperty()
    @JsonElementType(ProjectSettings)
    public ProjectSettings: IProjectSettings;


    /*
     *  Constructors
     */
    public constructor() {
        this.ActiveProjectPath = "";
        this.PackageSettings = new PackageSettings();
        this.ProjectSettings = new ProjectSettings();
    }


    /*
     *  Methods
     */
    public static deserialize(gentron: IGentron): Gentron {
        return Utilities.JSON.deserialize({
            ActiveProjectPath: gentron.ActiveProjectPath,
            PackageSettings: gentron.PackageSettings,
            ProjectSettings: gentron.ProjectSettings
        }, Gentron);
    }

    public static parse(gentronJson: string): Gentron {
        return Utilities.JSON.parse(gentronJson, Gentron);
    }

    public static save(iGentron: IGentron): IGentronFsResult<void> {
        const gentron: Gentron = this.deserialize(iGentron);
        const packageSettings: IPackageSettings = gentron.PackageSettings;
        const projectSettings: IProjectSettings = gentron.ProjectSettings;

        let infoMessage: string = "";

        const projectSettingsDirectory: string = path.dirname(iGentron.ActiveProjectPath);
        const localPackageFolderExists: boolean = Utilities.hasStringValue(projectSettings.LocalPackageFolder);
        const packageNameExists: boolean = Utilities.hasStringValue(packageSettings.PackageName);

        if (!localPackageFolderExists && !packageNameExists) {
            infoMessage = InfoMessages.PACKAGE_FOLDER_AND_NAME_NULL;
            projectSettings.LocalPackageFolder = projectSettingsDirectory
                + path.sep + GentronConstants.DEFAULT_LOCAL_PACKAGE_FOLDER;
        }
        else if (!localPackageFolderExists && packageNameExists) {
            infoMessage = InfoMessages.PACKAGE_LOCAL_FOLDER_NULL;
            projectSettings.LocalPackageFolder = projectSettingsDirectory
                + path.sep + packageSettings.PackageName;
        }

        const projectSettingsStr: string = JSON.stringify(Utilities.JSON.serialize(projectSettings), null, 4);
        const projectSaveResult: IFileOperationResult<void> = File.write(iGentron.ActiveProjectPath, projectSettingsStr);
        if (projectSaveResult.IsError) {
            return GentronFsResult.fail(projectSaveResult.ErrorMessage);
        }

        const packageSettingsStr: string = JSON.stringify(Utilities.JSON.serialize(packageSettings), null, 4);

        const packageFilePath: string = projectSettings.LocalPackageFolder
            + path.sep + GentronConstants.DEFAULT_PACKAGE_NAME;
        const packageSaveResult: IFileOperationResult<void> = File.write(packageFilePath, packageSettingsStr, true);
        if (packageSaveResult.IsError) {
            return GentronFsResult.fail(packageSaveResult.ErrorMessage);
        }

        return GentronFsResult.ok(void 0, infoMessage);
    }

    public static open(fileName: string): IGentronFsResult<IGentron> {
        const ret: IGentron = new Gentron();

        const projectReadResult: IFileOperationResult<string> = File.read(fileName);
        if (projectReadResult.IsError) {
            return GentronFsResult.fail(projectReadResult.ErrorMessage);
        }

        try {
            ret.ProjectSettings = Utilities.JSON.parse(projectReadResult.Result, ProjectSettings);
        }
        catch (e) {
            return GentronFsResult.fail((e as NodeJS.ErrnoException).message);
        }

        if (!Utilities.hasStringValue(ret.ProjectSettings.LocalPackageFolder)) {
            return GentronFsResult.ok(ret, InfoMessages.LOCAL_PACKAGE_FOLDER_NOT_FOUND);
        }

        const packageFilePath: string = ret.ProjectSettings.LocalPackageFolder
            + path.sep + GentronConstants.DEFAULT_PACKAGE_NAME;
        const packageReadResult: IFileOperationResult<string> = File.read(packageFilePath);
        if (packageReadResult.IsError) {
            return GentronFsResult.fail(packageReadResult.ErrorMessage);
        }

        try {
            ret.PackageSettings = Utilities.JSON.parse(packageReadResult.Result, PackageSettings);
        }
        catch (e) {
            return GentronFsResult.fail((e as NodeJS.ErrnoException).message);
        }

        return GentronFsResult.ok(ret);
    }
}