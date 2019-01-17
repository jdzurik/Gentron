"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var File_1;
const fs = require("fs");
const path = require("path");
const abstract_1 = require("./abstract");
const results_1 = require("./results");
const ta_json_1 = require("ta-json");
const _1 = require("./");
let File = File_1 = class File extends abstract_1.Cloneable {
    constructor() {
        super();
        this.Contents = '';
        this.LastModified = undefined;
        this.Path = '';
    }
    static read(filePath) {
        try {
            const buf = fs.readFileSync(filePath);
            const contents = buf.toString();
            return results_1.Result.ok(contents);
        }
        catch (e) {
            return results_1.Result.fail(e.message.toString());
        }
    }
    static readAsync(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buf = yield fs.promises.readFile(filePath);
                const contents = buf.toString();
                return results_1.Result.ok(contents);
            }
            catch (e) {
                return results_1.Result.fail(e.message.toString());
            }
        });
    }
    static write(filePath, fileContents, mkDirIfNotExists = false) {
        try {
            if (mkDirIfNotExists && !fs.existsSync(filePath.substring(0, filePath.lastIndexOf(path.sep)))) {
                _1.IOUtils.mkDirByPathSync(filePath.substring(0, filePath.lastIndexOf(path.sep)));
            }
            fs.writeFileSync(filePath, fileContents);
            return results_1.Result.ok();
        }
        catch (e) {
            console.error(e);
            return results_1.Result.fail(e.message.toString());
        }
    }
    static writeAsync(filePath, fileContents) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.writeFile(filePath, fileContents);
                return results_1.Result.ok();
            }
            catch (e) {
                return results_1.Result.fail(e.message.toString());
            }
        });
    }
    clone() {
        const ret = new File_1();
        ret._id = this._id;
        ret.Contents = this.Contents;
        ret.LastModified = this.LastModified;
        ret.Path = this.Path;
        return ret;
    }
    loadContents() {
        if (!_1.ObjectUtils.hasStringValue(this.Path)) {
            return;
        }
        try {
            const buf = fs.readFileSync(this.Path);
            this.Contents = buf.toString();
            const stats = fs.statSync(this.Path);
            this.LastModified = stats.mtime;
        }
        catch (e) {
            console.error(e);
        }
    }
    loadContentsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_1.ObjectUtils.hasStringValue(this.Path)) {
                return;
            }
            try {
                const buf = yield fs.promises.readFile(this.Path);
                this.Contents = buf.toString();
                const stats = yield fs.promises.stat(this.Path);
                this.LastModified = stats.mtime;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    writeContents() {
        if (!_1.ObjectUtils.hasStringValue(this.Path)) {
            return results_1.Result.ok();
        }
        try {
            fs.writeFileSync(this.Path, this.Contents);
            return results_1.Result.ok();
        }
        catch (e) {
            console.error(e);
            return results_1.Result.fail(_1.ObjectUtils.getErrorMessage(e));
        }
    }
    writeContentsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_1.ObjectUtils.hasStringValue(this.Path)) {
                return results_1.Result.ok();
            }
            try {
                yield fs.promises.writeFile(this.Path, this.Contents);
                return results_1.Result.ok();
            }
            catch (e) {
                console.error(e);
                return results_1.Result.fail(_1.ObjectUtils.getErrorMessage(e));
            }
        });
    }
    update(file) {
        if (!_1.ObjectUtils.hasValue(file)) {
            return;
        }
        this.LastModified = file.LastModified;
        if (this.Path !== file.Path) {
            this.Path = file.Path;
            if (!_1.ObjectUtils.hasStringValue(this.Path.trim())) {
                this.Contents = "";
            }
            else {
                this.loadContents();
            }
        }
        if (this.Contents !== file.Contents && _1.ObjectUtils.hasStringValue(file.Contents)) {
            this.Contents = file.Contents;
        }
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], File.prototype, "Contents", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", Date)
], File.prototype, "LastModified", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    __metadata("design:type", String)
], File.prototype, "Path", void 0);
File = File_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], File);
exports.default = File;
//# sourceMappingURL=File.js.map