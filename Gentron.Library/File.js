"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class File {
    get Contents() {
        return this._contents;
    }
    set Contents(value) {
        this._contents = value;
    }
    get LastModified() {
        return this._lastModified;
    }
    set LastModified(value) {
        this._lastModified = value;
    }
    get Path() {
        return this._path;
    }
    set Path(value) {
        this._path = value;
    }
    constructor() {
        this._contents = "";
        this._lastModified = undefined;
        this._path = "";
    }
    loadContentsSync(filePath = this.Path || "", setContents = true) {
        try {
            const buf = fs.readFileSync(filePath);
            const contents = buf.toString();
            if (setContents) {
                this.Contents = contents;
            }
            return contents;
        }
        catch (e) {
            return e.message.toString();
        }
    }
    update(file) {
        this.LastModified = file.LastModified;
        if (this.Path !== file.Path) {
            this.Path = file.Path;
            this.Contents = this.loadContentsSync();
        }
    }
}
exports.File = File;
