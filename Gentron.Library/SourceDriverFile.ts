import { JsonObject, JsonProperty } from 'ta-json';
import { File, VMUtils, ObjectUtils } from './';
import { ModulePackage, ModuleList } from './types';



@JsonObject()
export default class SourceDriverFile extends File {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public IncludeDirname: boolean;

    @JsonProperty()
    public IncludeFilename: boolean;

    @JsonProperty()
    public IncludeRequires: boolean;

    public ModifiedContents: string;

    @JsonProperty()
    public PackageList: ModulePackage[];


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.IncludeDirname = false;
        this.IncludeFilename = false;
        this.IncludeRequires = false;
        this.ModifiedContents = '';
        this.PackageList = [];
    }


    /*
     *  Methods
     */
    public clone(): SourceDriverFile {
        const ret: SourceDriverFile = new SourceDriverFile();

        ret._id = this._id;
        ret.Contents = this.Contents;
        ret.LastModified = this.LastModified;
        ret.Path = this.Path;

        ret.IncludeDirname = this.IncludeDirname;
        ret.IncludeFilename = this.IncludeFilename;
        ret.IncludeRequires = this.IncludeRequires;
        ret.PackageList = this.PackageList.map((module: ModulePackage, index: number, arr: ModulePackage[]) => {
            return { ...module };
        });

        return ret;
    }


}
