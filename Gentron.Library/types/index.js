"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateTypes;
(function (TemplateTypes) {
    TemplateTypes[TemplateTypes["Partial"] = 0] = "Partial";
    TemplateTypes[TemplateTypes["Primary"] = 1] = "Primary";
})(TemplateTypes = exports.TemplateTypes || (exports.TemplateTypes = {}));
const TemplateTypesCatalogKeys = Object.keys(TemplateTypes).filter(k => typeof TemplateTypes[k] === 'number');
const TemplateTypesCatalogValues = TemplateTypesCatalogKeys.map(k => TemplateTypes[k]);
exports.TemplateTypesCatalog = TemplateTypesCatalogKeys.map((key, index, arr) => {
    return { Key: key, Value: TemplateTypesCatalogValues[index] };
});
//# sourceMappingURL=index.js.map