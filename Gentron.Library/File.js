"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    fromJson(json) {
        this._contents = json.Contents;
        this._lastModified = json.LastModified;
        this._path = json.Path;
        return this;
    }
    toJson() {
        return {
            Contents: this.Contents,
            LastModified: this.LastModified,
            Path: this.Path
        };
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
    loadContents(filePath = this.Path || "", setContents = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buf = yield fs.promises.readFile(filePath);
                const contents = buf.toString();
                if (setContents) {
                    this.Contents = contents;
                }
                return contents;
            }
            catch (e) {
                return e.message.toString();
            }
        });
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
