export interface ProjectSettingsState {
    LocalPackageFolder: string;
    OutputCodeFolder: string;
    RemotePackageLocation: string;
}

export class ProjectSettings implements ProjectSettingsState {
    /*
     *  Properties & Fields 
     */
    private _localPackageFolder: string;

    public get LocalPackageFolder(): string {
        return this._localPackageFolder;
    }

    public set LocalPackageFolder(value: string) {
        this._localPackageFolder = value;
    }


    private _outputCodeFolder: string;

    public get OutputCodeFolder(): string {
        return this._outputCodeFolder;
    }

    public set OutputCodeFolder(value: string) {
        this._outputCodeFolder = value;
    }


    private _remotePackageLocation: string;

    public get RemotePackageLocation(): string {
        return this._remotePackageLocation;
    }

    public set RemotePackageLocation(value: string) {
        this._remotePackageLocation = value;
    }


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Methods
     */
    public static fromJson(jsonStr: string): ProjectSettingsState {
        return JSON.parse(jsonStr) as ProjectSettingsState;
    }

    public static toJson(obj: ProjectSettingsState): string {
        return JSON.stringify(obj);
    }
}