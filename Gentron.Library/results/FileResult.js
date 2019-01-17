"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_1 = require("../abstract");
class FileResult extends abstract_1.Cloneable {
    constructor() {
        super();
        this.FileValue = "";
        this.FullFilePath = "";
        this.CreateDate = new Date();
        this.FilePath = "";
        this.FileName = "";
        this.FileExtention = "";
    }
    clone() {
        const ret = new FileResult();
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
exports.default = FileResult;
//# sourceMappingURL=FileResult.js.map