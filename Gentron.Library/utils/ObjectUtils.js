"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectUtils {
    static equal(a, b) {
        if (a === b) {
            return true;
        }
        if (a && b && this.isObject(a) && this.isObject(b)) {
            const arrA = this.isArray(a);
            const arrB = this.isArray(b);
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
    static hasValue(obj) {
        return typeof (obj) !== typeof (undefined) && obj !== null;
    }
    static hasStringValue(obj, ...objs) {
        const isValid = (_obj) => this.hasValue(_obj) && _obj.toString().length > 0;
        if (!isValid(obj)) {
            return false;
        }
        if (this.hasValue(objs) && this.isArray(objs) && objs.length > 0) {
            for (let i = 0; i < objs.length; ++i) {
                if (!isValid(objs[i])) {
                    return false;
                }
            }
        }
        return true;
    }
    static hasObjectValue(obj) {
        if (!this.isObject) {
            return false;
        }
        for (let key in obj) {
            return true;
        }
        return false;
    }
    static isArray(obj) {
        return this.hasValue(obj) && Array.isArray(obj) || obj instanceof Array;
    }
    static isBoolean(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof (true);
    }
    static isFunction(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ((() => { }));
    }
    static isObject(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ({});
    }
    static isNumber(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof (0);
    }
    static isPrimitive(obj) {
        return this.hasValue(obj)
            && (typeof (obj) === typeof (true)
                || typeof (obj) === typeof (0)
                || typeof (obj) === typeof (''));
    }
    static isString(obj) {
        return this.hasValue(obj) && typeof (obj) === typeof ('');
    }
    static getErrorMessage(thrownError) {
        try {
            return thrownError.message;
        }
        catch (e) {
            return thrownError.toString() || this.getErrorMessage(e);
        }
    }
    static compareDates(date1, date2) {
        if (date1.getUTCFullYear() < date2.getUTCFullYear()) {
            return -1;
        }
        if (date1.getUTCFullYear() === date2.getUTCFullYear()) {
            if (date1.getUTCMonth() < date2.getUTCMonth()) {
                return -1;
            }
            if (date1.getUTCMonth() === date2.getUTCMonth()) {
                if (date1.getUTCDate() < date2.getUTCDate()) {
                    return -1;
                }
                if (date1.getUTCDate() === date2.getUTCDate()) {
                    if (date1.getUTCHours() < date2.getUTCHours()) {
                        return -1;
                    }
                    if (date1.getUTCHours() === date2.getUTCHours()) {
                        if (date1.getUTCMinutes() < date2.getUTCMinutes()) {
                            return -1;
                        }
                        if (date1.getUTCMinutes() === date2.getUTCMinutes()) {
                            if (date1.getUTCSeconds() < date2.getUTCSeconds()) {
                                return -1;
                            }
                            if (date1.getUTCSeconds() === date2.getUTCSeconds()) {
                                if (date1.getUTCMilliseconds() < date2.getUTCMilliseconds()) {
                                    return -1;
                                }
                                if (date1.getUTCMilliseconds() === date2.getUTCMilliseconds()) {
                                    return 0;
                                }
                                return 1;
                            }
                            return 1;
                        }
                        return 1;
                    }
                    return 1;
                }
                return 1;
            }
            return 1;
        }
        return 1;
    }
}
exports.default = ObjectUtils;
//# sourceMappingURL=ObjectUtils.js.map