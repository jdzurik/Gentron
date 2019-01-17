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
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1;
const vm = require("vm");
const SourceBase_1 = require("./SourceBase");
const converters_1 = require("./converters");
const ta_json_1 = require("ta-json");
const types_1 = require("./types");
const _1 = require("./");
const utils_1 = require("./utils");
let Engine = Engine_1 = class Engine extends SourceBase_1.default {
    constructor() {
        super();
        this.ActiveOutputPathGroup = new _1.OutputPathGroup();
        this.EngineCode = new _1.EngineCodeFile();
        this.Templates = [];
    }
    get HasPrimaryTemplate() {
        return (this.Templates || []).filter(t => t.Type === types_1.TemplateTypes.Primary).length === 1;
    }
    get HasPartialTemplates() {
        return (this.Templates || []).filter(t => t.Type === types_1.TemplateTypes.Partial).length >= 1;
    }
    clone() {
        const ret = new Engine_1();
        ret._id = this._id;
        ret.ActiveOutputPathGroup = this.ActiveOutputPathGroup.clone();
        ret.EngineCode = this.EngineCode.clone();
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        ret.Templates = this.Templates.map((template, index) => {
            return template.clone();
        });
        return ret;
    }
    execute(dirname, localPackageFolder, results) {
        this.EngineCode.resolveModulesRelativePaths(dirname, localPackageFolder);
        let vmState = {
            jsonObj: results,
            globalScope: {
                templateResult: ''
            }
        };
        if ((this.Templates || []).length > 0 && this.HasPrimaryTemplate && this.HasPartialTemplates) {
            vmState.templateTexts = this.Templates.map(t => {
                return {
                    Contents: t.TemplateCode.Contents,
                    Name: t.Name,
                    Type: t.Type,
                };
            });
        }
        else {
            vmState.templateText = this.Templates[0].TemplateCode.Contents;
        }
        const ctx = _1.VMUtils.createContext(this.EngineCode.toModuleListOptions(), vmState);
        vm.runInNewContext(this.EngineCode.ModifiedContents, ctx);
        utils_1.FileParserUtils.parseAndWriteFiles(vmState.globalScope.templateResult, this.ActiveOutputPathGroup.Paths[0].Path);
    }
    testScript(moduleSource) {
        const ctx = _1.VMUtils.createContext(this.EngineCode.toModuleListOptions(), {});
        vm.runInNewContext(moduleSource, ctx);
    }
    update(engine) {
        if (!_1.ObjectUtils.hasValue(engine)) {
            return;
        }
        this.ActiveOutputPathGroup = engine.ActiveOutputPathGroup;
        this.EngineCode.update(engine.EngineCode);
        this.IsActive = engine.IsActive;
        this.Name = engine.Name;
        this.Result = engine.Result;
    }
};
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonElementType(_1.OutputPathGroup),
    ta_json_1.JsonConverter(converters_1.ActiveOutputPathGroupConverter),
    __metadata("design:type", _1.OutputPathGroup)
], Engine.prototype, "ActiveOutputPathGroup", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonType(_1.EngineCodeFile),
    ta_json_1.JsonConverter(converters_1.CodeEngineFileJsonConverter),
    __metadata("design:type", _1.EngineCodeFile)
], Engine.prototype, "EngineCode", void 0);
__decorate([
    ta_json_1.JsonProperty(),
    ta_json_1.JsonType(_1.Template),
    __metadata("design:type", Array)
], Engine.prototype, "Templates", void 0);
Engine = Engine_1 = __decorate([
    ta_json_1.JsonObject(),
    __metadata("design:paramtypes", [])
], Engine);
exports.default = Engine;
//# sourceMappingURL=Engine.js.map