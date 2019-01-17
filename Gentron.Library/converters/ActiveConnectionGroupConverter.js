"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class ActiveConnectionGroupConverter {
    serialize(property) {
        return {
            ID: property.ID
        };
    }
    deserialize(_value) {
        const value = _value;
        const connectionGroup = new __1.ConnectionGroup();
        connectionGroup._id = value.ID;
        return connectionGroup;
    }
}
exports.default = ActiveConnectionGroupConverter;
//# sourceMappingURL=ActiveConnectionGroupConverter.js.map