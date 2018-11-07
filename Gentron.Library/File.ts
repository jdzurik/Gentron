import * as fs from "fs";
import { FileOperationResult, IFileOperationResult } from "./results";
import { IModifiable } from "./interfaces"
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from "./";

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
    loadContents(filePath?: string, setContents?: boolean): string;
    loadContentsAsync(filePath?: string, setContents?: boolean): Promise<string>;
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
    public static read(filePath: string): IFileOperationResult<string> {
        try {
            const buf: Buffer = fs.readFileSync(filePath);
            const contents: string = buf.toString();

            return FileOperationResult.ok(contents);
        }
        catch (e) {
            return FileOperationResult.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public static async readAsync(filePath: string): Promise<IFileOperationResult<string>> {
        try {
            const buf: Buffer = await fs.promises.readFile(filePath);
            const contents: string = buf.toString();

            return FileOperationResult.ok(contents);
        }
        catch (e) {
            return FileOperationResult.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public static write(filePath: string, fileContents: string): FileOperationResult<void> {
        try {
            fs.writeFileSync(filePath, fileContents);
            return FileOperationResult.ok();
        }
        catch (e) {
            return FileOperationResult.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public static async writeAsync(filePath: string, fileContents: string): Promise<FileOperationResult<void>> {
        try {
            await fs.promises.writeFile(filePath, fileContents);
            return FileOperationResult.ok();
        }
        catch (e) {
            return FileOperationResult.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public loadContents(filePath: string = this.Path || "", setContents: boolean = true): string {
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

    public async loadContentsAsync(filePath: string = this.Path || "", setContents: boolean = true): Promise<string> {
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
        if (!Utilities.hasValue(file)) {
            return;
        }

        this.LastModified = file.LastModified;

        if (this.Path !== file.Path) {
            this.Path = file.Path;
            this.Contents = this.loadContents();
        }
    }
}