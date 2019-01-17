import * as path from 'path';
import * as util from 'util';
import ObjectUtils from './utils/ObjectUtils';
import { exec } from 'child_process';

const execAsync = util.promisify(exec);

type NPMInstallOptions = {
    global?: boolean;
    output?: boolean;
    save?: boolean;
    saveDev?: boolean;
};

export default class NPMUtil {
    private static optOrEmpty(possibleOpt: boolean | undefined, trueValue: string, falseValue?: string): string {
        if (ObjectUtils.isBoolean(possibleOpt) && possibleOpt) {
            return trueValue;
        }
        else {
            return falseValue || '';
        }
    }

    private static async buildAndExecuteCommand(cwd: string, npmCommand: string, packages: string | string[], extraArgs?: string[] | null, options?: NPMInstallOptions): Promise<void> {
        let packagesArr: string[];
        
        if (!packages || (packages || { length: 0 }).length === 0) {
            return Promise.reject('No packages found')
        }
        
        if (typeof (packages) === typeof ('')) {
            packagesArr = [packages as string];
        }
        else {
            packagesArr = packages as string[];
        }
        
        let opts: NPMInstallOptions = options || { saveDev: true };

        const cmdStr: string = `npm ${npmCommand} ${packagesArr.join(' ')}`
            + (extraArgs ? ' ' + extraArgs.join(' ') : '')
            + this.optOrEmpty(opts.global, ' --global')
            + this.optOrEmpty(opts.save, ' --save', ' --no-save')
            + this.optOrEmpty(opts.saveDev, ' --save-dev');

        try {
            const { stdout, stderr } = await execAsync(cmdStr, { cwd: cwd });

            if (opts.output) {
                if (stdout) {
                    console.log('stdout:', stdout);
                }

                if (stderr) {
                    console.log('stderr:', stderr);
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    public static async install(cwd: string, packages: string | string[], options?: NPMInstallOptions): Promise<void> {
        return this.buildAndExecuteCommand(cwd, 'install', packages, null, options);
    }

    public static async uninstall(cwd: string, packages: string | string[], options?: NPMInstallOptions): Promise<void> {
        return this.buildAndExecuteCommand(cwd, 'uninstall', packages, null, options);
    }

    public static async list(): Promise<void> {
        return this.buildAndExecuteCommand(path.join(__dirname, '../'), 'list', [''], ['--depth 0'], { global: true, saveDev: false, output: true });
    }
}