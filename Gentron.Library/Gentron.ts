import Guid from "./utils/Guid";
import { PackageSettings, IPackageSettings } from "./PackageSettings";
import { ProjectSettings, IProjectSettings } from "./ProjectSettings";
import IJsonSerializable from "./interfaces/IJsonSerializable";

export interface IGentron extends IJsonSerializable {
    /*
     *  Properties & Fields 
     */
    readonly ID: string;
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

    //public ProjectSettings: ProjectSettings;


    /*
     *  Constructors
     */
    public constructor(id?: string) {
        this._id = id || Guid.newCryptoGuid();
        this._packageSettings = new PackageSettings();
        this._projectSettings = new ProjectSettings();
        //this.ProjectSettings = new ProjectSettings();
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IGentron {
        const ret: IGentron = new Gentron(obj.ID);

        ret.PackageSettings = PackageSettings.fromJson(obj.PackageSettings);
        ret.ProjectSettings = ProjectSettings.fromJson(obj.ProjectSettings);

        return ret;
    }

    public toJson(): any {
        return {
            ID: this.ID,
            PackageSettings: this.PackageSettings.toJson(),
            ProjectSettings: this.ProjectSettings.toJson(),
        };
    }

    public static toJson(obj: IGentron): any {
        return {
            ID: obj.ID,
            PackageSettings: PackageSettings.toJson(obj.PackageSettings),
            ProjectSettings: ProjectSettings.toJson(obj.ProjectSettings),
        };
    }

    public static save(): void {

    }

    public static saveAs(): void {

    }

    public static open(): void {

    }
}