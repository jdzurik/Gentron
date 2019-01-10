export default class ObjectUtils {
    /*
     *  Methods
     */
    public static equal(a: any, b: any): boolean {
        if (a === b) {
            return true;
        }

        if (a && b && this.isObject(a) && this.isObject(b)) {
            const arrA = this.isArray(a);
            const arrB = this.isArray(b);
            let i: number;
            let length: number;
            let key: string;

            if (arrA && arrB) {
                length = (a as any[]).length;

                if (length != (b as any[]).length) {
                    return false;
                }

                for (i = length; i-- !== 0;) {
                    if (!this.equal((a as any[])[i], (b as any[])[i])) {
                        return false;
                    }
                }

                return true;
            }

            if (arrA != arrB) {
                return false;
            }

            const dateA: boolean = a instanceof Date;
            const dateB: boolean = b instanceof Date;

            if (dateA != dateB) {
                return false;
            }

            if (dateA && dateB) {
                return (a as Date).getTime() == (b as Date).getTime();
            }

            const regexpA: boolean = a instanceof RegExp;
            const regexpB: boolean = b instanceof RegExp;

            if (regexpA != regexpB) {
                return false;
            }

            if (regexpA && regexpB) {
                return (a as RegExp).toString() == (b as RegExp).toString();
            }

            const keys: string[] = Object.keys(a);
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
    };


    public static hasValue(obj: any): boolean {
        return typeof (obj) !== typeof (undefined) && obj !== null;
    }


    public static hasStringValue(obj: any, ...objs: any): boolean {
        const isValid = (_obj: any) => this.hasValue(_obj) && _obj.toString().length > 0;

        if (!isValid(obj)) {
            return false;
        }
    
        if (this.hasValue(objs) && this.isArray(objs) && objs.length > 0) {
            for (let i: number = 0; i < objs.length; ++i) {
                if (!isValid(objs[i])) {
                    return false;
                }
            }
        }
    
        return true;
    }


    public static hasObjectValue(obj: any): boolean {
        if (!this.isObject) {
            return false;
        }

        for (let key in obj) {
            return true;
        }

        return false;
    }


    public static isArray(obj: any): boolean {
        return this.hasValue(obj) && Array.isArray(obj) || obj instanceof Array;
    }


    public static isBoolean(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof (true);
    }


    public static isFunction(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ((() => { }));
    }


    public static isObject(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ({});
    }


    public static isNumber(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof (0);
    }


    public static isPrimitive(obj: any): boolean {
        return this.hasValue(obj)
            && (typeof (obj) === typeof (true)
                || typeof (obj) === typeof (0)
                || typeof (obj) === typeof (''));
    }


    public static isString(obj: any): boolean {
        return this.hasValue(obj) && typeof (obj) === typeof ('');
    }


    public static getErrorMessage(thrownError: any): string {
        try {
            return (thrownError as NodeJS.ErrnoException).message;
        }
        catch (e) {
            return thrownError.toString() || this.getErrorMessage(e);
        }
    }


    public static compareDates(date1: Date, date2: Date): number {
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