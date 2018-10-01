import Guid from "./utils/Guid";
import { PackageSettings, IPackageSettings } from "./PackageSettings";
import { ProjectSettings, IProjectSettings } from "./ProjectSettings";

export interface IGentron {
    /*
     *  Properties & Fields 
     */
    ID: string;
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

export class Gentron implements IGentron {
    /*
     *  Properties & Fields 
     */
    private _id: string;

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
    public constructor() {
        this._id = Guid.newCryptoGuid();
        this._packageSettings = new PackageSettings();
        this._projectSettings = new ProjectSettings();
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IGentron {
        const ret: IGentron = new Gentron();

        ret.ID = obj.ID;
        ret.PackageSettings = PackageSettings.fromJson(obj.PackageSettings);
        ret.ProjectSettings = ProjectSettings.fromJson(obj.ProjectSettings);

        return ret;
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