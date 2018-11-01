import { IIdentifiable, IJsonSerializable } from "./interfaces";
import { PackageSettings, IPackageSettings, ProjectSettings, IProjectSettings, Utilities } from ".";
import { JsonSerializable } from "./abstract";

export interface IGentron extends IJsonSerializable<IGentron>, IIdentifiable {
    /*
     *  Properties & Fields 
     */
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

export class Gentron extends JsonSerializable<IGentron> implements IGentron {
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
        super();
        this._id = id || Utilities.newCryptoGuid();
        this._packageSettings = new PackageSettings();
        this._projectSettings = new ProjectSettings();
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