import { IPackageSettings, IProjectSettings, PackageSettings, ProjectSettings, Utilities, File } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { IFileOperationResult } from "./results";

export interface IGentron {
    /*
     *  Properties & Fields 
     */
    ActiveProjectPath: string;
    PackageSettings: IPackageSettings;
    ProjectSettings: IProjectSettings;
}

@JsonObject()
export class Gentron implements IGentron {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public ActiveProjectPath: string;

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
        this.ActiveProjectPath = "";
        this.PackageSettings = new PackageSettings();
        this.ProjectSettings = new ProjectSettings();
    }


    /*
     *  Methods
     */
    public static deserialize(gentron: IGentron): Gentron {
        return Utilities.JSON.deserialize({
            ActiveProjectPath: gentron.ActiveProjectPath,
            PackageSettings: gentron.PackageSettings,
            ProjectSettings: gentron.ProjectSettings
        }, Gentron);
    }

    public static parse(gentronJson: string): Gentron {
        return Utilities.JSON.parse(gentronJson, Gentron);
    }

    public static save(gentron: IGentron): IFileOperationResult<void> {
        const stateStr: string = JSON.stringify(Utilities.JSON.serialize(this.deserialize(gentron)), null, 4);

        return File.write(gentron.ActiveProjectPath, stateStr);
    }

    public static open(fileName: string): IFileOperationResult<string> {
        return File.read(fileName);
    }
}