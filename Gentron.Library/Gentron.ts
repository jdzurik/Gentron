import { IIdentifiable } from "./interfaces";
import { IPackageSettings, IProjectSettings, PackageSettings, ProjectSettings, Utilities } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { Cloneable, Identifiable } from "./abstract";

export interface IGentron extends IIdentifiable {
    /*
     *  Properties & Fields 
     */
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

@JsonObject()
export class Gentron extends Identifiable implements IGentron {
    /*
     *  Properties & Fields 
     */
    //  Oddidity in TaJSON -- type must be set here 
    //  and setting JsonElementType(PackageSettings)
    //  does not work
    @JsonProperty()
    @JsonElementType(Identifiable)
    public PackageSettings: IPackageSettings;

    //  Oddidity in TaJSON -- type must be set here 
    //  and setting JsonElementType(ProjectSettings)
    //  does not work
    @JsonProperty()
    @JsonElementType(Identifiable)
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
    public static save(): void {

    }

    public static saveAs(): void {

    }

    public static open(): void {

    }
}