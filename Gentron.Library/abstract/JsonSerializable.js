"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = require("../Utilities");
class JsonSerializable {
    constructor() {
        this.IgnoreFields = ["IgnoreFields"];
    }
    equal(a, b) {
        if (a === b) {
            return true;
        }
        if (a && b && typeof a == 'object' && typeof b == 'object') {
            const arrA = Utilities_1.default.isArray(a);
            const arrB = Utilities_1.default.isArray(b);
            let i;
            let length;
            let key;
            if (arrA && arrB) {
                length = a.length;
                if (length != b.length) {
                    return false;
                }
                for (i = length; i-- !== 0;) {
                    if (!this.equal(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            if (arrA != arrB) {
                return false;
            }
            const dateA = a instanceof Date;
            const dateB = b instanceof Date;
            if (dateA != dateB) {
                return false;
            }
            if (dateA && dateB) {
                return a.getTime() == b.getTime();
            }
            const regexpA = a instanceof RegExp;
            const regexpB = b instanceof RegExp;
            if (regexpA != regexpB) {
                return false;
            }
            if (regexpA && regexpB) {
                return a.toString() == b.toString();
            }
            const keys = Object.keys(a);
            length = keys.length;
            if (length !== Object.keys(b).length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                    return false;
                }
            }
            for (i = length; i-- !== 0;) {
                key = keys[i];
                if (!this.equal(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        return a !== a && b !== b;
    }
    ;
    copyObject(obj) {
        const ret = {};
        Object.setPrototypeOf(ret, obj);
        const inheritedProps = this.getInheritedProps(obj);
        for (let key of inheritedProps) {
            const value = obj[key];
            if (!Utilities_1.default.hasValue(value)) {
                continue;
            }
            if (Utilities_1.default.isPrimitive(value)) {
                try {
                    ret[key] = value;
                }
                catch (_a) { }
            }
            else if (Utilities_1.default.isObject(value)) {
                try {
                    ret[key] = this.copyObject(value);
                }
                catch (_b) { }
            }
        }
        return ret;
    }
    getInheritedProps(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        let nonFnPropNames = propNames.filter((propName) => {
            return !Utilities_1.default.isFunction(obj[propName]);
        });
        const proto = Object.getPrototypeOf(obj);
        if (proto !== Utilities_1.default.ObjectPrototype) {
            nonFnPropNames = nonFnPropNames.concat(this.getInheritedProps(proto));
        }
        return nonFnPropNames;
    }
    getPotentialMatches(obj, inheritedProps) {
        const copy = this.copyObject(obj);
        const potentialMatches = [];
        for (let i = 0; i < inheritedProps.length; ++i) {
            for (let j = 0; j < inheritedProps.length; ++j) {
                if (i === j) {
                    continue;
                }
                const iKey = inheritedProps[i];
                const jKey = inheritedProps[j];
                const iVal = copy[iKey];
                const jVal = copy[jKey];
                if ((Utilities_1.default.isPrimitive(iVal) && iVal === jVal) || this.equal(iVal, jVal)) {
                    let found = false;
                    for (let k = 0; k < potentialMatches.length; ++k) {
                        const potentialMatch = potentialMatches[k];
                        if ((potentialMatch.Key1 === iKey) && (potentialMatch.Key2 === jKey) || (potentialMatch.Key1 === jKey && potentialMatch.Key2 === iKey)) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        potentialMatches.push({
                            Key1: iKey,
                            Value1: iVal,
                            Key2: jKey,
                            Value2: jVal
                        });
                    }
                }
            }
        }
        return potentialMatches;
    }
    resolvePotentialMatches(obj, potentialMatches) {
        const matches = [];
        for (let key in potentialMatches) {
            const copy = this.copyObject(obj);
            const potentialMatch = potentialMatches[key];
            const potentialPrivateKey = copy.propertyIsEnumerable(potentialMatch.Key1)
                ? potentialMatch.Key1
                : copy.propertyIsEnumerable(potentialMatch.Key2)
                    ? potentialMatch.Key2
                    : "";
            const potentialPublicKey = copy.propertyIsEnumerable(potentialMatch.Key1)
                ? potentialMatch.Key2
                : copy.propertyIsEnumerable(potentialMatch.Key2)
                    ? potentialMatch.Key1
                    : "";
            let match = false;
            if (Utilities_1.default.isArray(copy[potentialPrivateKey]) && this.equal(copy[potentialPrivateKey], copy[potentialPublicKey])) {
                copy[potentialPrivateKey].push(1);
                match = this.equal(copy[potentialPrivateKey], copy[potentialPublicKey]);
            }
            else if (Utilities_1.default.isObject(copy[potentialPrivateKey]) && this.equal(copy[potentialPrivateKey], copy[potentialPublicKey])) {
                const _now = Date.now();
                copy[potentialPrivateKey][_now] = _now;
                match = this.equal(copy[potentialPrivateKey], copy[potentialPublicKey]);
            }
            else if (Utilities_1.default.isPrimitive(copy[potentialPrivateKey]) && copy[potentialPrivateKey] === copy[potentialPublicKey]) {
                if (Utilities_1.default.isBoolean(copy[potentialPrivateKey])) {
                    copy[potentialPrivateKey] = !copy[potentialPrivateKey];
                }
                if (Utilities_1.default.isNumber(copy[potentialPrivateKey])) {
                    try {
                        copy[potentialPrivateKey] += 1;
                    }
                    catch (_a) {
                        copy[potentialPrivateKey] -= 1;
                    }
                }
                if (Utilities_1.default.isString(copy[potentialPrivateKey])) {
                    copy[potentialPrivateKey] += "_";
                }
                match = (copy[potentialPrivateKey] === copy[potentialPublicKey]);
            }
            if (match) {
                if (copy.propertyIsEnumerable(potentialMatch.Key1) && !copy.propertyIsEnumerable(potentialMatch.Key2)) {
                    matches.push(potentialMatch.Key1);
                }
                else if (copy.propertyIsEnumerable(potentialMatch.Key2) && !copy.propertyIsEnumerable(potentialMatch.Key1)) {
                    matches.push(potentialMatch.Key2);
                }
            }
        }
        return matches;
    }
    toJson(obj = this) {
        const inheritedProps = this.getInheritedProps(obj);
        const potentialMatches = this.getPotentialMatches(obj, inheritedProps);
        potentialMatches.forEach((potentialMatch, i) => {
            const key1 = potentialMatch.Key1;
            if (obj.IgnoreFields.indexOf(key1) >= 0 && inheritedProps.indexOf(key1) >= 0) {
                inheritedProps.splice(inheritedProps.indexOf(key1), 1);
            }
            const key2 = potentialMatch.Key2;
            if (obj.IgnoreFields.indexOf(key2) >= 0 && inheritedProps.indexOf(key2) >= 0) {
                inheritedProps.splice(inheritedProps.indexOf(key2), 1);
            }
        });
        const matches = this.resolvePotentialMatches(obj, potentialMatches);
        for (let i = 0; i < matches.length; ++i) {
            const match = matches[i];
            const idx = inheritedProps.indexOf(match);
            if (idx >= 0 || obj.IgnoreFields && obj.IgnoreFields.indexOf(match) >= 0) {
                inheritedProps.splice(idx, 1);
            }
        }
        const ret = {};
        for (let key of inheritedProps) {
            if (obj.IgnoreFields && obj.IgnoreFields.indexOf(key) >= 0) {
                continue;
            }
            const value = obj[key];
            if (Utilities_1.default.isPrimitive(value)) {
                ret[key] = value;
            }
            else if (Utilities_1.default.isArray(value)) {
                ret[key] = [];
                for (let i = 0; i < value.length; ++i) {
                    const arrValue = obj[key][i];
                    if (Utilities_1.default.isPrimitive(arrValue)) {
                        ret[key].push(arrValue);
                    }
                    else if (Utilities_1.default.isObject(arrValue) && arrValue.toJson) {
                        ret[key].push(this.toJson(arrValue));
                    }
                }
            }
            else if (Utilities_1.default.isObject(value) && value.toJson) {
                ret[key] = this.toJson(value);
            }
        }
        return ret;
    }
}
exports.default = JsonSerializable;
