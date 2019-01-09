import * as fs from "fs";
import * as path from "path";
import { ModuleList, QuotationChar, ModulePackage } from "../types";
import ObjectUtils from "./ObjectUtils";
import * as vm from "vm";

declare const __non_webpack_require__: string;

export default class VMUtils {
    /*
     *  Properties & Fields
     */
    private static readonly doublePathSep: string = path.sep + path.sep;
    private static readonly consoleRegex: RegExp = /console.(assert|clear|count|error|group|groupCollapsed|groupEnd|info|log|table|time|timeEnd|trace|warn)/gm;
    private static readonly dirnameRegex: RegExp = /__dirname/gm;
    private static readonly filenameRegex: RegExp = /__filename/gm;
    private static readonly requireRegex: RegExp = /require\(([\'|\"])([\w\d\-\_\/\.]*)([\'|\"])\)\;?/gm;
    private static readonly builtinModules: string[] = [
        'assert', 'buffer', 'child_process',
        'cluster', 'crypto', 'dgram', 'dns',
        'domain', 'events', 'fs', 'http',
        'https', 'net', 'os', 'path', 'punycode',
        'querystring', 'readline', 'stream',
        'string_decoder', 'timers', 'tls', 'tty',
        'url', 'util', 'v8', 'vm', 'zlib'
    ];


    /*
     *  Methods
     */
    public static createContext(moduleList: ModuleList, initialState?: any): vm.Context {
        const obj: any = initialState || {};

        if (moduleList.IncludeConsole) {
            obj['console'] = console;
        }

        if (moduleList.IncludeDirname) {
            obj['__dirname'] = __dirname;
        }        
    
        if (moduleList.IncludeFilename) {
            obj['__filename'] = __filename;
        }
    
        //  TODO: find a workaround for this,
        //  __non_webpack_require__ won't be
        //  defined in a CLI environment so
        //  we need a way to fallback to the
        //  normal node requires in that case
        if (moduleList.IncludeRequires) {
            obj['require'] = __non_webpack_require__;
        }
    
        return vm.createContext(obj);
    }


    public static getDependenciesFromModuleSource(moduleSource: string): ModuleList {
        const ret: ModuleList = {
            IncludeConsole: false,
            IncludeDirname: false,
            IncludeFilename: false,
            IncludeRequires: false,
            PackageList: []
        };

        let match: RegExpMatchArray | null;
        
        const regexStr: string = '(' + this.requireRegex.source + ')'
            + '|' + '(' + this.consoleRegex.source + ')'
            + '|' + '(' + this.dirnameRegex.source + ')'
            + '|' + '(' + this.filenameRegex.source + ')';
        const regex: RegExp = new RegExp(regexStr, 'gm');
        

        while ((match = regex.exec(moduleSource)) !== null) {
            if (match.length === 0) {
                continue;
            }

            const fullMatch: string = match[0];

            if (!ret.IncludeConsole && new RegExp(this.consoleRegex.source, 'gm').test(fullMatch)) {
                ret.IncludeConsole = true;
            }

            if (!ret.IncludeDirname && new RegExp(this.dirnameRegex.source, 'gm').test(fullMatch)) {
                ret.IncludeDirname = true;
            }

            if (!ret.IncludeFilename && new RegExp(this.filenameRegex.source, 'gm').test(fullMatch)) {
                ret.IncludeFilename = true;
            }

            let localRequires: boolean = false;

            if (new RegExp(this.requireRegex.source, 'gm').test(fullMatch)) {
                localRequires = true;

                if (!ret.IncludeRequires) {
                    ret.IncludeRequires = true;
                }
            }

            if (localRequires && ObjectUtils.hasStringValue(match[1], match[2], match[3], match[4])) {
                const delimeter: QuotationChar = (match[2] === match[4] && (match[2] === '\'' || match[2] === '"'))
                    ? match[2] as QuotationChar
                    : '\'';
                const isBuiltInNodeModule: boolean = this.builtinModules.indexOf(match[3]) >= 0;
                const moduleName: string = match[3];
                let relativeModulePath: string = '';

                ret.PackageList!.push({
                    Delimeter: delimeter,
                    IsBuiltInNodeModule: isBuiltInNodeModule,
                    ModuleName: moduleName,
                    RelativeModulePath: relativeModulePath
                });
            }
        }

        return ret;
    }


    public static resolveModuleRelativePath(dirname: string, localPackageFolder: string, module: ModulePackage): void {
        if (module.IsBuiltInNodeModule) {
            return;
        }

        const absoluteLocalPackageFolder: string = path.join(localPackageFolder, 'node_modules', module.ModuleName);
        const dotSep = `..${path.sep}${path.sep}`;
        const _dirname = path.join(dirname, dotSep, dotSep, dotSep, dotSep, dotSep, dotSep, dotSep, dotSep);
        let relativeModulePath = path.relative(dirname, absoluteLocalPackageFolder);
        module.RelativeModulePath = relativeModulePath.replace(new RegExp(this.doublePathSep, 'g'), this.doublePathSep);
        //console.log(module.RelativeModulePath, fs.existsSync(module.RelativeModulePath));
        //console.log(path.join(module.RelativeModulePath, '..'), fs.existsSync(path.join(module.RelativeModulePath, '..')));
    }


    public static rewriteModuleRequires(modulePackages: ModulePackage[], moduleSource: string): string {
        let match: RegExpMatchArray | null;
        let replacers: any = {};

        const regexStr: string = '(' + this.requireRegex.source + ')';
        const regex: RegExp = new RegExp(regexStr, 'gm');
        
        while ((match = regex.exec(moduleSource)) !== null) {
            if (match.length === 0) {
                continue;
            }
    
            const fullMatch: string = match[0];
    
            if (new RegExp(regexStr, 'gm').test(fullMatch)
                && ObjectUtils.hasStringValue(match[1], match[2], match[3], match[4])) {
                for (let i: number = 0; i < modulePackages.length; ++i) {
                    if (match[3] === modulePackages[i].ModuleName) {
                        replacers[fullMatch] = `require(${modulePackages[i].Delimeter}${modulePackages[i].RelativeModulePath}${modulePackages[i].Delimeter});`;
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