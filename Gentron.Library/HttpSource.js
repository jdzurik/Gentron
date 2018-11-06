"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpSource_1;
const SourceBase_1 = require("./SourceBase");
const ta_json_1 = require("ta-json");
let HttpSource = HttpSource_1 = class HttpSource extends SourceBase_1.SourceBase {
    clone() {
        const ret = new HttpSource_1();
        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;
        ret.Result = this.Result;
        return ret;
    }
    update(httpSource) {
        this.IsActive = httpSource.IsActive;
        this.Name = httpSource.Name;
        this.Result = httpSource.Result;
    }
};
HttpSource = HttpSource_1 = __decorate([
    ta_json_1.JsonObject()
], HttpSource);
exports.HttpSource = HttpSource;
//# sourceMappingURL=HttpSource.js.map