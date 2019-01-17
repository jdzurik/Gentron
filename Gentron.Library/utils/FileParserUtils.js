"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const _1 = require(".");
const results_1 = require("../results");
class FileParserUtils {
    static getMatches(regexStr, str) {
        let match;
        let matches = [];
        const regex = new RegExp(regexStr, 'gm');
        while ((match = regex.exec(str)) !== null) {
            matches.push(match);
        }
        return matches;
    }
    static parseAndWriteFiles(result, outputPath) {
        let bofMatches = this.getMatches(this.bofRegex, result);
        let eofMatches = this.getMatches(this.eofRegex, result);
        if (bofMatches.length !== eofMatches.length) {
            return results_1.Result.fail('An issue occurred parsing the template results');
        }
        for (let i = 0; i < bofMatches.length; ++i) {
            const bofMatch = bofMatches[i];
            if (bofMatch.index === undefined) {
                return results_1.Result.fail('An issue occurred parsing the template results');
            }
            const eofMatch = eofMatches[i];
            if (eofMatch.index === undefined) {
                return results_1.Result.fail('An issue occurred parsing the template results');
            }
            if (bofMatch.length !== eofMatch.length) {
                return results_1.Result.fail('An issue occurred parsing the template results');
            }
            if (eofMatch.index <= bofMatch.index) {
                return results_1.Result.fail('An issue occurred parsing the template results');
            }
            if (bofMatch[1] !== eofMatch[1]) {
                return results_1.Result.fail('An issue occurred parsing the template results');
            }
            if (!fs.existsSync(outputPath)) {
                _1.IOUtils.mkDirByPathSync(outputPath);
            }
            fs.writeFileSync(path.join(outputPath, bofMatch[1]), result.toString().substring(bofMatch.index + bofMatch[0].length, eofMatch.index));
        }
        return results_1.Result.ok();
    }
}
FileParserUtils.bofRegex = /####_BOF_ filename=([\w\d\-\_\s]*\.[\w\d]+)(?:\s+|\r\n)####/gm;
FileParserUtils.eofRegex = /####_EOF_ filename=([\w\d\-\_\s]*\.[\w\d]+)(?:\s+|\r\n)####/gm;
exports.default = FileParserUtils;
//# sourceMappingURL=FileParserUtils.js.map