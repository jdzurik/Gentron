﻿import * as path from 'path';
import { ConnectionGroup, DatabaseConnection, DatabaseSource, File, ObjectUtils, PackageSettings, ProjectSettings, SerializationUtils, Engine, OutputPathGroup, OutputPath } from './';
import { Gentron as GentronConstants, InfoMessages } from './constants';
import { JsonElementType, JsonObject, JsonProperty } from 'ta-json';
import { Result, TGentronFsResult } from './results';

export interface IGentron {
    /*
     *  Properties & Fields 
     */
    ActiveProjectPath: string;
    PackageSettings: PackageSettings;
    ProjectSettings: ProjectSettings;
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
    public PackageSettings: PackageSettings;

    @JsonProperty()
    @JsonElementType(ProjectSettings)
    public ProjectSettings: ProjectSettings;


    /*
     *  Constructors
     */
    public constructor() {
        this.ActiveProjectPath = '';
        this.ProjectSettings = new ProjectSettings();
        this.PackageSettings = new PackageSettings(this.ProjectSettings);
    }


    /*
     *  Methods
     */
    public static deserialize(gentron: IGentron): Gentron {
        return SerializationUtils.TaJson.deserialize({
            ActiveProjectPath: gentron.ActiveProjectPath,
            PackageSettings: gentron.PackageSettings,
            ProjectSettings: gentron.ProjectSettings
        }, Gentron);
    }

    public static parse(gentronJson: string): Gentron {
        return SerializationUtils.TaJson.parse(gentronJson, Gentron);
    }

    public static save(iGentron: IGentron): Result<TGentronFsResult> {
        const gentron: Gentron = this.deserialize(iGentron);
        const packageSettings: PackageSettings = gentron.PackageSettings;
        const projectSettings: ProjectSettings = gentron.ProjectSettings;

        let infoMessage: string = '';

        const projectSettingsDirectory: string = path.dirname(iGentron.ActiveProjectPath);
        const localPackageFolderExists: boolean = ObjectUtils.hasStringValue(projectSettings.LocalPackageFolder);
        const packageNameExists: boolean = ObjectUtils.hasStringValue(packageSettings.PackageName);

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

        const projectSettingsStr: string = JSON.stringify(SerializationUtils.TaJson.serialize(projectSettings), null, 4);
        const projectSaveResult: Result<void> = File.write(iGentron.ActiveProjectPath, projectSettingsStr);
        if (projectSaveResult.IsError) {
            return Result.fail(projectSaveResult.ErrorMessage);
        }

        const packageSettingsStr: string = JSON.stringify(SerializationUtils.TaJson.serialize(packageSettings), null, 4);

        const packageFilePath: string = projectSettings.LocalPackageFolder
            + path.sep + GentronConstants.DEFAULT_PACKAGE_NAME;
        const packageSaveResult: Result<void> = File.write(packageFilePath, packageSettingsStr, true);
        if (packageSaveResult.IsError) {
            return Result.fail(packageSaveResult.ErrorMessage);
        }

        return Result.ok<TGentronFsResult>({ InfoMessage: infoMessage });
    }


    public static open(fileName: string): Result<TGentronFsResult> {
        const ret: IGentron = new Gentron();
        ret.ActiveProjectPath = fileName;

        const projectReadResult: Result<string> = File.read(fileName);
        if (projectReadResult.IsError) {
            return Result.fail(projectReadResult.ErrorMessage);
        }

        try {
            ret.ProjectSettings = SerializationUtils.TaJson.parse(projectReadResult.Result, ProjectSettings);
        }
        catch (e) {
            return Result.fail((e as NodeJS.ErrnoException).message);
        }

        if (!ObjectUtils.hasStringValue(ret.ProjectSettings.LocalPackageFolder)) {
            return Result.ok<TGentronFsResult>({ Gentron: ret, InfoMessage: InfoMessages.LOCAL_PACKAGE_FOLDER_NOT_FOUND });
        }

        const packageFilePath: string = ret.ProjectSettings.LocalPackageFolder
            + path.sep + GentronConstants.DEFAULT_PACKAGE_NAME;
        const packageReadResult: Result<string> = File.read(packageFilePath);
        if (packageReadResult.IsError) {
            return Result.fail(packageReadResult.ErrorMessage);
        }

        try {
            ret.PackageSettings = SerializationUtils.TaJson.parse(packageReadResult.Result, PackageSettings);

            ret.PackageSettings.DatabaseSources.forEach((source: DatabaseSource, index: number) => {
                // const connections: Array<DatabaseConnection>[] = ret.ProjectSettings.DatabaseConnections.filter((connection: Array<DatabaseConnection>) => {
                //     return connection.ID === source.ActiveConnectionGroup.ID;
                // });

                // if (connections.length > 0) {
                //     source.ActiveConnectionGroup = connections[0];
                // }
            });

            ret.PackageSettings.Engines.forEach((source: Engine, index: number) => {
                // const outputPathGroups: OutputPathGroup<OutputPath>[] = ret.ProjectSettings.OutputPathGroups.filter((outputPath: OutputPathGroup<OutputPath>) => {
                //     return outputPath.ID === source.ActiveOutputPathGroup.ID;
                // });

                // if (outputPathGroups.length > 0) {
                //     source.ActiveOutputPathGroup = outputPathGroups[0];
                // }
            });
        }
        catch (e) {
            return Result.fail((e as NodeJS.ErrnoException).message);
        }

        return Result.ok<TGentronFsResult>({ Gentron: ret });
    }


    public async Run() {
        console.log(' Start Run ...');
        
        console.log(this.PackageSettings.DatabaseSources );
        
        
        this.PackageSettings.DatabaseSources.forEach(DbSource => {
            console.log(DbSource.Name + ' Start.')
            //DbSource.Script.loadContents();
           DbSource.executeScript().then(() => {
                console.log(DbSource.Name + ' Data Loaded.' );      
                this.StartEngines();                 
            })
            .catch((err) => {
               console.log('DB Source load error: ' + err.toString()); 
            })
        });
        
        
    }

    private StartEngines(){
        let  dataResult: any = '';
        dataResult = this.PackageSettings.buildDataSourceResults();
        console.log(dataResult);

        this.PackageSettings.Engines.forEach(engine => {
            engine.run(this.ProjectSettings.LocalPackageFolder, dataResult, (outputData:any)=>{
                if(outputData){
                    console.log('Engine: '+engine.Name+' error');}
                else{
                    console.log('Engine: '+engine.Name+' Complete');
                }
            } )
        });
        console.log(' End Run.')

    }
}
