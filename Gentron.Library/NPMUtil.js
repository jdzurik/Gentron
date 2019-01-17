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
const path = require("path");
const util = require("util");
const ObjectUtils_1 = require("./utils/ObjectUtils");
const child_process_1 = require("child_process");
const execAsync = util.promisify(child_process_1.exec);
class NPMUtil {
    static optOrEmpty(possibleOpt, trueValue, falseValue) {
        if (ObjectUtils_1.default.isBoolean(possibleOpt) && possibleOpt) {
            return trueValue;
        }
        else {
            return falseValue || '';
        }
    }
    static buildAndExecuteCommand(cwd, npmCommand, packages, extraArgs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let packagesArr;
            if (!packages || (packages || { length: 0 }).length === 0) {
                return Promise.reject('No packages found');
            }
            if (typeof (packages) === typeof ('')) {
                packagesArr = [packages];
            }
            else {
                packagesArr = packages;
            }
            let opts = options || { saveDev: true };
            const cmdStr = `npm ${npmCommand} ${packagesArr.join(' ')}`
                + (extraArgs ? ' ' + extraArgs.join(' ') : '')
                + this.optOrEmpty(opts.global, ' --global')
                + this.optOrEmpty(opts.save, ' --save', ' --no-save')
                + this.optOrEmpty(opts.saveDev, ' --save-dev');
            try {
                const { stdout, stderr } = yield execAsync(cmdStr, { cwd: cwd });
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
        });
    }
    static install(cwd, packages, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buildAndExecuteCommand(cwd, 'install', packages, null, options);
        });
    }
    static uninstall(cwd, packages, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buildAndExecuteCommand(cwd, 'uninstall', packages, null, options);
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.buildAndExecuteCommand(path.join(__dirname, '../'), 'list', [''], ['--depth 0'], { global: true, saveDev: false, output: true });
        });
    }
}
exports.default = NPMUtil;
//# sourceMappingURL=NPMUtil.js.map