import { Cloneable } from "../abstract";

export default class FileResult extends Cloneable<FileResult> {

    public FileValue: string;
    public FullFilePath: string;
    public CreateDate: Date;

    public FilePath: string;
    public FileName: string;
    public FileExtention: string;

    /*
 *  Constructors
 */
    public constructor() {
        super();
        this.FileValue = "";
        this.FullFilePath = "";
        this.CreateDate = new Date();

        this.FilePath = "";
        this.FileName = "";
        this.FileExtention = "";


    }
    public clone(): FileResult {
        const ret: FileResult = new FileResult();

        ret._id = this._id;
        ret.FileValue = this.FileValue;
        ret.FullFilePath = this.FullFilePath;
        ret.CreateDate = this.CreateDate;
        ret.FilePath = this.FilePath;
        ret.FileName = this.FileName;
        ret.FileExtention = this.FileExtention;

        return ret;
    }
}