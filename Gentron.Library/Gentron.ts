import { IPackageSettings, IProjectSettings, PackageSettings, ProjectSettings, Utilities } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";

export interface IGentron {
    /*
     *  Properties & Fields 
     */
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

@JsonObject()
export class Gentron implements IGentron {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(PackageSettings)
    public PackageSettings: IPackageSettings;

    @JsonProperty()
    @JsonElementType(ProjectSettings)
    public ProjectSettings: IProjectSettings;


    /*
     *  Constructors
     */
    public constructor() {
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