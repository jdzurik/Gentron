"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class ActiveOutputPathGroupConverter {
    serialize(property) {
        return {
            ID: property.ID
        };
    }
    deserialize(_value) {
        const value = _value;
        const outputPathGroup = new __1.OutputPathGroup();
        outputPathGroup._id = value.ID;
        return outputPathGroup;
    }
}
exports.default = ActiveOutputPathGroupConverter;
//# sourceMappingURL=ActiveOutputPathGroupConverter.js.map