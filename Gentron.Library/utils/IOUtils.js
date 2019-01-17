"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class IOUtils {
    static mkDirByPathSync(targetDir, args = {}) {
        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir)
            ? sep
            : '';
        const baseDir = args.isRelativeToScript
            ? __dirname
            : '.';
        return targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
            try {
                fs.mkdirSync(curDir);
            }
            catch (err) {
                if (err.code === 'EEXIST') {
                    return curDir;
                }
                if (err.code === 'ENOENT') {
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }
                const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                    throw err;
                }
            }
            return curDir;
        }, initDir);
    }
}
exports.default = IOUtils;
//# sourceMappingURL=IOUtils.js.map