export interface IPackageSettings {
    /*
     *  Properties & Fields 
     */
    PackageName: string;
    ReadMeText: string;
}

export class PackageSettings implements IPackageSettings {
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
    public constructor() {
        this._packageName = "";
        this._readMeText = "";
    }


    /*
     *  Methods
     */
    public static fromJson(obj: any): IPackageSettings {
        const ret: IPackageSettings = new PackageSettings();

        ret.PackageName = obj.PackageName;
        ret.ReadMeText = obj.ReadMeText;

        return ret;
    }

    public static toJson(obj: IPackageSettings): any {
        return {
            PackageName: obj.PackageName,
            ReadMeText: obj.ReadMeText
        };
    }
}