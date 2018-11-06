import { ConnectionGroup, IConnectionGroup, IDatabaseConnection, IOutputPath, IOutputPathGroup, OutputPathGroup } from "./";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import { Identifiable } from "./abstract";
import { IIdentifiable } from "./interfaces";

export interface IProjectSettings extends IIdentifiable {
    /*
     *  Properties & Fields 
     */
    DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];
    LocalPackageFolder: string;
    OutputPathGroups: IOutputPathGroup<IOutputPath>[];
    RemotePackageLocation: string;
}

@JsonObject()
export class ProjectSettings extends Identifiable implements IProjectSettings {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionGroup)
    public DatabaseConnections: IConnectionGroup<IDatabaseConnection>[];

    @JsonProperty()
    public LocalPackageFolder: string;

    @JsonProperty()
    @JsonElementType(OutputPathGroup)
    public OutputPathGroups: IOutputPathGroup<IOutputPath>[];

    @JsonProperty()
    public RemotePackageLocation: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.DatabaseConnections = [];
        this.LocalPackageFolder = "";
        this.OutputPathGroups = [];
        this.RemotePackageLocation = "";
    }


    /*
     *  Methods
     */
}