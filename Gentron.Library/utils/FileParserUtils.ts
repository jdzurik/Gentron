import * as fs from 'fs';
import * as path from 'path';
import { IOUtils } from '.';
import { Result } from '../results';

export default class FileParserUtils {
    /*
     *  Properties & Fields
     */
    private static readonly bofRegex: RegExp = /####_BOF_ filename=([\w\d\-\_\s]*\.[\w\d]+)(?:\s+|\r\n)####/gm;
    private static readonly eofRegex: RegExp = /####_EOF_ filename=([\w\d\-\_\s]*\.[\w\d]+)(?:\s+|\r\n)####/gm;


    /*
     *  Methods
     */
    private static getMatches(regexStr: RegExp, str: string): RegExpMatchArray[] {
        let match: RegExpMatchArray | null;
        let matches: RegExpMatchArray[] = [];

        const regex: RegExp = new RegExp(regexStr, 'gm');

        while ((match = regex.exec(str)) !== null) {
            matches.push(match);
        }

        return matches;
    }


    public static parseAndWriteFiles(result: string, outputPath: string): Result<void> {
        let bofMatches: RegExpMatchArray[] = this.getMatches(this.bofRegex, result);
        let eofMatches: RegExpMatchArray[] = this.getMatches(this.eofRegex, result);

        if (bofMatches.length !== eofMatches.length) {
            return Result.fail('An issue occurred parsing the template results');
        }

        for (let i: number = 0; i < bofMatches.length; ++i) {
            const bofMatch: RegExpMatchArray = bofMatches[i];
            if (bofMatch.index === undefined) {
                return Result.fail('An issue occurred parsing the template results');
            }

            const eofMatch: RegExpMatchArray = eofMatches[i];
            if (eofMatch.index === undefined) {
                return Result.fail('An issue occurred parsing the template results');
            }

            if (bofMatch.length !== eofMatch.length) {
                return Result.fail('An issue occurred parsing the template results');
            }

            if (eofMatch.index! <= bofMatch.index!) {
                return Result.fail('An issue occurred parsing the template results');
            }

            if (bofMatch[1] !== eofMatch[1]) {
                return Result.fail('An issue occurred parsing the template results');
            }

            if (!fs.existsSync(outputPath)) {
                IOUtils.mkDirByPathSync(outputPath);
            }

            fs.writeFileSync(path.join(outputPath, bofMatch[1]), result.toString().substring(bofMatch.index + bofMatch[0].length, eofMatch.index))
        }

        return Result.ok();
    }
}