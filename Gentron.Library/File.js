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
const fs = require("fs");
const ta_json_1 = require("ta-json");
let File = class File {
    constructor() {
        this.Contents = "";
        this.LastModified = undefined;
        this.Path = "";
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
File = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], File);
exports.File = File;
//# sourceMappingURL=File.js.map