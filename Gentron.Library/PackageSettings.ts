export interface PackageSettingsState {
    PackageName: string;
    ReadMeText: string;
}

export class PackageSettings implements PackageSettingsState {
    /*
     *  Properties & Fields 
     */
    private _packageName: string;

    public get PackageName(): string {
        return this._packageName;
    }

    public set PackageName(value: string) {
        this._packageName = value;
    }


    private _readMeText: string;

    public get ReadMeText(): string {
        return this._readMeText;
    }

    public set ReadMeText(value: string) {
        this._readMeText = value;
    }


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Methods
     */
    public static fromJson(jsonStr: string): PackageSettingsState {
        return JSON.parse(jsonStr) as PackageSettingsState;
    }

    public static toJson(obj: PackageSettingsState): string {
        return JSON.stringify(obj);
    }
}