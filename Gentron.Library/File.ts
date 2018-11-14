import * as fs from "fs";
import * as path from "path";
import { Cloneable } from "./abstract";
import { Result } from "./results";
import { IModifiable } from "./interfaces"
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from "./";

@JsonObject()
export default class File extends Cloneable<File> implements IModifiable<File> {
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
        super();
        this.Contents = "";
        this.LastModified = undefined;
        this.Path = "";
    }


    /*
     *  Methods
     */
    public static read(filePath: string): Result<string> {
        try {
            const buf: Buffer = fs.readFileSync(filePath);
            const contents: string = buf.toString();

            return Result.ok(contents);
        }
        catch (e) {
            return Result.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public static async readAsync(filePath: string): Promise<Result<string>> {
        try {
            const buf: Buffer = await fs.promises.readFile(filePath);
            const contents: string = buf.toString();

            return Result.ok(contents);
        }
        catch (e) {
            return Result.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public static write(filePath: string, fileContents: string, mkDirIfNotExists: boolean = false): Result<void> {
        try {
            if (mkDirIfNotExists && !fs.existsSync(filePath.substring(0, filePath.lastIndexOf(path.sep)))) {
                Utilities.mkDirByPathSync(filePath.substring(0, filePath.lastIndexOf(path.sep)));
            }
            fs.writeFileSync(filePath, fileContents);
            return Result.ok();
        }
        catch (e) {
            console.error(e);
            return Result.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public static async writeAsync(filePath: string, fileContents: string): Promise<Result<void>> {
        try {
            await fs.promises.writeFile(filePath, fileContents);
            return Result.ok();
        }
        catch (e) {
            return Result.fail((e as NodeJS.ErrnoException).message.toString());
        }
    }

    public clone(): File {
        const ret: File = new File();

        ret._id = this._id;
        ret.Contents = this.Contents;
        ret.LastModified = this.LastModified;
        ret.Path = this.Path;

        return ret;
    }

    public loadContents(): void {
        if (!Utilities.hasStringValue(this.Path)) {
            return;
        }

        try {
            const buf: Buffer = fs.readFileSync(this.Path);
            this.Contents = buf.toString();

            const stats: fs.Stats = fs.statSync(this.Path);
            this.LastModified = stats.mtime;
        }
        catch (e) {
            console.error(e);
        }
    }

    public async loadContentsAsync(): Promise<void> {
        if (!Utilities.hasStringValue(this.Path)) {
            return;
        }

        try {
            const buf: Buffer = await fs.promises.readFile(this.Path);
            this.Contents = buf.toString();

            const stats: fs.Stats = await fs.promises.stat(this.Path);
            this.LastModified = stats.mtime;
        }
        catch (e) {
            console.error(e);
        }
    }

    public writeContents(): void {
        if (!Utilities.hasStringValue(this.Path)) {
            return;
        }

        try {
            fs.writeFileSync(this.Path, this.Contents);
        }
        catch (e) {
            console.error(e);
        }
    }

    public async writeContentsAsync(): Promise<void> {
        if (!Utilities.hasStringValue(this.Path)) {
            return;
        }

        try {
            await fs.promises.writeFile(this.Path, this.Contents);
        }
        catch (e) {
            console.error(e);
        }
    }

    public update(file: File): void {
        if (!Utilities.hasValue(file)) {
            return;
        }

        this.LastModified = file.LastModified;

        if (this.Path !== file.Path) {
            this.Path = file.Path;

            if (!Utilities.hasStringValue(this.Path.trim())) {
                this.Contents = "";
            }
            else {
                this.loadContents();
            }
        }
    }
}