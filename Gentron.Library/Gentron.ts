import { IIdentifiable, IJsonSerializable } from "./interfaces";
import { PackageSettings, IPackageSettings, ProjectSettings, IProjectSettings, Utilities } from ".";
import { NonFunctionProperties } from "./types";

export interface IGentron extends IJsonSerializable<IGentron>, IIdentifiable {
    /*
     *  Properties & Fields 
     */
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

export class Gentron implements IGentron {
    /*
     *  Properties & Fields 
     */
    private readonly _id: string;

    public get ID(): string {
        return this._id;
    }


    private _packageSettings: IPackageSettings;

    public get PackageSettings(): IPackageSettings {
        return this._packageSettings;
    }

    public set PackageSettings(value: IPackageSettings) {
        this._packageSettings = value;
    }


    private _projectSettings: IProjectSettings;

    public get ProjectSettings(): IProjectSettings {
        return this._projectSettings;
    }

    public set ProjectSettings(value: IProjectSettings) {
        this._projectSettings = value;
    }


    /*
     *  Constructors
     */
    public constructor(id?: string) {
        this._id = id || Utilities.newCryptoGuid();
        this._packageSettings = new PackageSettings();
        this._projectSettings = new ProjectSettings();
    }


    /*
     *  Methods
     */
    public fromJson(json: NonFunctionProperties<IGentron>): IGentron {
        this._packageSettings = this._packageSettings.fromJson(json.PackageSettings);
        this._projectSettings = this._projectSettings.fromJson(json.ProjectSettings);

        return this;
    }

    public toJson(): NonFunctionProperties<IGentron> {
        return {
            ID: this._id,
            PackageSettings: this._packageSettings.toJson() as IPackageSettings,
            ProjectSettings: this._projectSettings.toJson() as IProjectSettings
        };
    }

    public static save(): void {

    }

    public static saveAs(): void {

    }

    public static open(): void {

    }
}