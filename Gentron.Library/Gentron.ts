import Package from "./Package";
import Project from "./Project";

export default class Gentron {
    /*
     *  Properties & Fields 
     */
    private _package: Package;

    public get Package(): Package {
        return this._package;
    }

    public set Package(_package: Package) {
        this._package = _package;
    }

    private _project: Project;

    public get Project(): Project {
        return this._project;
    }

    public set Project(_project: Project) {
        this._project = _project;
    }


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Methods
     */
    public static fromJson(jsonStr: string): Gentron {
        return JSON.parse(jsonStr) as Gentron;
    }

    public static toJson(gentronObj: Gentron): string {
        return JSON.stringify(gentronObj);
    }
}