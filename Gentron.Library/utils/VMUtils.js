"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ObjectUtils_1 = require("./ObjectUtils");
const vm = require("vm");
class VMUtils {
    static createContext(moduleList, initialState) {
        const obj = initialState || {};
        if (moduleList.IncludeConsole) {
            obj['console'] = console;
        }
        if (moduleList.IncludeDirname) {
            obj['__dirname'] = __dirname;
        }
        if (moduleList.IncludeFilename) {
            obj['__filename'] = __filename;
        }
        if (moduleList.IncludeRequires) {
            obj['require'] = __non_webpack_require__;
        }
        return vm.createContext(obj);
    }
    static getDependenciesFromModuleSource(moduleSource) {
        const ret = {
            IncludeConsole: false,
            IncludeDirname: false,
            IncludeFilename: false,
            IncludeRequires: false,
            PackageList: []
        };
        let match;
        const regexStr = '(' + this.requireRegex.source + ')'
            + '|' + '(' + this.consoleRegex.source + ')'
            + '|' + '(' + this.dirnameRegex.source + ')'
            + '|' + '(' + this.filenameRegex.source + ')';
        const regex = new RegExp(regexStr, 'gm');
        while ((match = regex.exec(moduleSource)) !== null) {
            if (match.length === 0) {
                continue;
            }
            const fullMatch = match[0];
            if (!ret.IncludeConsole && new RegExp(this.consoleRegex.source, 'gm').test(fullMatch)) {
                ret.IncludeConsole = true;
            }
            if (!ret.IncludeDirname && new RegExp(this.dirnameRegex.source, 'gm').test(fullMatch)) {
                ret.IncludeDirname = true;
            }
            if (!ret.IncludeFilename && new RegExp(this.filenameRegex.source, 'gm').test(fullMatch)) {
                ret.IncludeFilename = true;
            }
            let localRequires = false;
            if (new RegExp(this.requireRegex.source, 'gm').test(fullMatch)) {
                localRequires = true;
                if (!ret.IncludeRequires) {
                    ret.IncludeRequires = true;
                }
            }
            if (localRequires && ObjectUtils_1.default.hasStringValue(match[1], match[2], match[3], match[4])) {
                const delimeter = (match[2] === match[4] && (match[2] === '\'' || match[2] === '"'))
                    ? match[2]
                    : '\'';
                const isBuiltInNodeModule = this.builtinModules.indexOf(match[3]) >= 0;
                const moduleName = match[3];
                let relativeModulePath = '';
                ret.PackageList.push({
                    Delimeter: delimeter,
                    IsBuiltInNodeModule: isBuiltInNodeModule,
                    ModuleName: moduleName,
                    RelativeModulePath: relativeModulePath
                });
            }
        }
        return ret;
    }
    static resolveModuleRelativePath(dirname, localPackageFolder, module) {
        if (module.IsBuiltInNodeModule) {
            return;
        }
        const absoluteLocalPackageFolder = path.join(localPackageFolder, 'node_modules', module.ModuleName);
        let relativeModulePath = path.relative(dirname, absoluteLocalPackageFolder);
        module.RelativeModulePath = relativeModulePath.replace(new RegExp(this.doublePathSep, 'g'), this.doublePathSep);
    }
    static rewriteModuleRequires(modulePackages, moduleSource) {
        let match;
        let replacers = {};
        const regexStr = '(' + this.requireRegex.source + ')';
        const regex = new RegExp(regexStr, 'gm');
        while ((match = regex.exec(moduleSource)) !== null) {
            if (match.length === 0) {
                continue;
            }
            const fullMatch = match[0];
            if (new RegExp(regexStr, 'gm').test(fullMatch)
                && ObjectUtils_1.default.hasStringValue(match[1], match[2], match[3], match[4])) {
                for (let i = 0; i < modulePackages.length; ++i) {
                    const modulePackage = modulePackages[i];
                    if (modulePackage.IsBuiltInNodeModule) {
                        continue;
                    }
                    if (match[3] === modulePackage.ModuleName) {
                        replacers[fullMatch] = 'require(' +
                            modulePackage.Delimeter +
                            modulePackage.RelativeModulePath +
                            modulePackage.Delimeter +
                            ');';
                    }
                }
            }
        }
        for (let key in replacers) {
            moduleSource = moduleSource.replace(key, replacers[key]);
        }
        return moduleSource;
    }
}
VMUtils.doublePathSep = path.sep + path.sep;
VMUtils.consoleRegex = /console.(assert|clear|count|error|group|groupCollapsed|groupEnd|info|log|table|time|timeEnd|trace|warn)/gm;
VMUtils.dirnameRegex = /__dirname/gm;
VMUtils.filenameRegex = /__filename/gm;
VMUtils.requireRegex = /require\(([\'|\"])([\w\d\-\_\/\.]*)([\'|\"])\)\;?/gm;
VMUtils.builtinModules = [
    'assert', 'buffer', 'child_process',
    'cluster', 'crypto', 'dgram', 'dns',
    'domain', 'events', 'fs', 'http',
    'https', 'net', 'os', 'path', 'punycode',
    'querystring', 'readline', 'stream',
    'string_decoder', 'timers', 'tls', 'tty',
    'url', 'util', 'v8', 'vm', 'zlib'
];
exports.default = VMUtils;
//# sourceMappingURL=VMUtils.js.map