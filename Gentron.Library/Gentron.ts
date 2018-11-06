import { IIdentifiable, ICloneable } from "./interfaces";
import { IPackageSettings, IProjectSettings, PackageSettings, ProjectSettings, Utilities } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { Cloneable } from "./abstract";

export interface IGentron extends ICloneable<IGentron> {
    /*
     *  Properties & Fields 
     */
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

@JsonObject()
export class Gentron extends Cloneable<IGentron> implements IGentron {
    /*
     *  Properties & Fields 
     */
    @JsonProperty("ID")
    protected _id: string;

    public get ID(): string {
        return this._id;
    }


    //  Oddidity in TaJSON -- type must be set 
    //  here and setting type(PackageSettings) 
    //  does not work
    @JsonProperty()
    @JsonElementType(Cloneable)
    public PackageSettings: IPackageSettings;

    //  Oddidity in TaJSON -- type must be set 
    //  here and setting type(ProjectSettings) 
    //  does not work
    @JsonProperty()
    @JsonElementType(Cloneable)
    public ProjectSettings: IProjectSettings;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._id = Utilities.newCryptoGuid();
        this.PackageSettings = new PackageSettings();
        this.ProjectSettings = new ProjectSettings();
    }


    /*
     *  Methods
     */
    public clone(): IGentron {
        throw new Error("Method not implemented");
    }

    public static save(): void {

    }

    public static saveAs(): void {

    }

    public static open(): void {

    }
}