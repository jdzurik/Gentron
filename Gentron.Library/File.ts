﻿import * as fs from "fs";
import { IModifiable } from "./interfaces"

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

export class File implements IFile {
    /*
     *  Properties & Fields
     */
    private _contents: string;

    public get Contents(): string {
        return this._contents;
    }

    public set Contents(value: string) {
        this._contents = value;
    }


    private _lastModified?: Date;

    public get LastModified(): Date | undefined {
        return this._lastModified;
    }

    public set LastModified(value: Date | undefined) {
        this._lastModified = value;
    }


    private _path: string;

    public get Path(): string {
        return this._path;
    }

    public set Path(value: string) {
        this._path = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._contents = "";
        this._lastModified = undefined;
        this._path = "";
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