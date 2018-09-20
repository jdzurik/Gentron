export default class Package {
    /*
     *  Properties & Fields 
     */
    private _packageName: string;

    public get PackageName(): string {
        return this._packageName;
    }

    public set PackageName(_packageName: string) {
        this._packageName = _packageName;
    }

    private _readMeText: string;

    public get ReadMeText(): string {
        return this._readMeText;
    }

    public set ReadMeText(_readMeText: string) {
        this._readMeText = _readMeText;
    }


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Methods
     */
    public static fromJson(jsonStr: string): Package {
        return JSON.parse(jsonStr) as Package;
    }

    public static toJson(packageObj: Package): string {
        return JSON.stringify(packageObj);
    }
}