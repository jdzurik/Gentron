import * as fs from "fs";
import * as path from "path";

type MkDirByPathArgs = {
    isRelativeToScript?: boolean;
};

export default class IOUtils {
    /*
     *  Methods
     */
    /*
     *  Taken from: https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync
     */
    public static mkDirByPathSync(targetDir: string, args: MkDirByPathArgs = {}) {
        const sep: '\\' | '/' = path.sep;
        const initDir: string = path.isAbsolute(targetDir)
            ? sep
            : '';
        const baseDir: string = args.isRelativeToScript
            ? __dirname
            : '.';

        return targetDir.split(sep).reduce((parentDir: string, childDir: string) => {
            const curDir: string = path.resolve(baseDir, parentDir, childDir);

            try {
                fs.mkdirSync(curDir);
            } catch (err) {
                //  curDir already exists!
                if (err.code === 'EEXIST') {
                    return curDir;
                }

                //  To avoid `EISDIR` error on Mac and 
                //  `EACCES`-- > `ENOENT` and`EPERM` on Windows.
                if (err.code === 'ENOENT') {
                    // Throw the original parentDir error on curDir `ENOENT` failure.
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }

                const caughtErr: boolean = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
                    // Throw if it's just the last created dir.
                    throw err;
                }
            }

            return curDir;
        }, initDir);
    }
}