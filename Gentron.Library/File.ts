import * as fs from "fs";
import { IModifiable } from "./interfaces"
import { JsonObject, JsonProperty } from "ta-json";

export interface IFile extends IModifiable<IFile> {
    /*
     *  Properties & Fields
     */
    Contents: string;
    LastModified?: Date;
    Path: string;

    /*
     *  Methods
     */
    loadContentsSync(filePath?: string, setContents?: boolean): string;
    loadContents(filePath?: string, setContents?: boolean): Promise<string>;
}

@JsonObject()
export class File implements IFile {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public Contents: string;

    @JsonProperty()
    public LastModified?: Date;

    @JsonProperty()
    public Path: string;


    /*
     *  Constructors
     */
    public constructor() {
        this.Contents = "";
        this.LastModified = undefined;
        this.Path = "";
    }


    /*
     *  Methods
     */
    public loadContentsSync(filePath: string = this.Path || "", setContents: boolean = true): string {
        try {
            const buf: Buffer = fs.readFileSync(filePath);
            const contents: string = buf.toString();

            if (setContents) {
                this.Contents = contents;
            }

            return contents;
        }
        catch (e) {
            return (e as NodeJS.ErrnoException).message.toString();
        }
    }

    public async loadContents(filePath: string = this.Path || "", setContents: boolean = true): Promise<string> {
        try {
            const buf: Buffer = await fs.promises.readFile(filePath);
            const contents: string = buf.toString();

            if (setContents) {
                this.Contents = contents;
            }

            return contents;
        }
        catch (e) {
            return (e as NodeJS.ErrnoException).message.toString();
        }
    }

    public update(file: IFile): void {
        this.LastModified = file.LastModified;

        if (this.Path !== file.Path) {
            this.Path = file.Path;
            this.Contents = this.loadContentsSync();
        }
    }
}