import { PackageSettings, PackageSettingsState } from "./PackageSettings";
import { ProjectSettings, ProjectSettingsState } from "./ProjectSettings";

export interface GentronState {
    PackageSettings: PackageSettingsState;
    ProjectSettings: ProjectSettingsState;
}

export class Gentron {
    /*
     *  Properties & Fields 
     */
    private _packageSettings: PackageSettingsState;

    public get Package(): PackageSettingsState {
        return this._packageSettings;
    }

    public set Package(value: PackageSettingsState) {
        this._packageSettings = value;
    }


    private _projectSettings: ProjectSettingsState;

    public get Project(): ProjectSettingsState {
        return this._projectSettings;
    }

    public set Project(value: ProjectSettingsState) {
        this._projectSettings = value;
    }


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Methods
     */
    public static fromJson(jsonStr: string): GentronState {
        return JSON.parse(jsonStr) as GentronState;
    }

    public static toJson(gentronObj: GentronState): string {
        return JSON.stringify(gentronObj);
    }
}