import { IJsonSerializable } from "../interfaces";
import Utilities from "../Utilities";

type PotentialPropertyMatch = {
    Key1: string;
    Key2: string;
    Value1: string;
    Value2: string;
}

export default abstract class JsonSerializable<T extends IJsonSerializable<T>> implements IJsonSerializable<T> {
    /*
     *  Properties & Fields
     */
    public IgnoreFields: [keyof T];


    /*
     *  Constructors
     */
    public constructor() {
        this.IgnoreFields = ["IgnoreFields"];
    }


    /*
     *  Methods
     */
    private equal(a: any, b: any): boolean {
        if (a === b) {
            return true;
        }

        if (a && b && typeof a == 'object' && typeof b == 'object') {
            const arrA = Utilities.isArray(a);
            const arrB = Utilities.isArray(b);
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

    private copyObject<T extends JsonSerializable<T>>(obj: T): T {
        const ret: T = {} as T;
        (Object as any).setPrototypeOf(ret, obj);

        const inheritedProps: [keyof T] = this.getInheritedProps(obj);
        for (let key of inheritedProps) {
            const value: any = obj[key];

            if (!Utilities.hasValue(value)) {
                continue;
            }

            if (Utilities.isPrimitive(value)) {
                try {
                    ret[key] = value;
                } catch { }
            }
            else if (Utilities.isObject(value)) {
                try {
                    ret[key] = this.copyObject(value);
                } catch { }
            }
        }

        return ret;
    }

    private getInheritedProps<T extends JsonSerializable<T>>(obj: T | JsonSerializable<T>): [keyof T] {
        const propNames: [keyof T] = Object.getOwnPropertyNames(obj) as [keyof T];

        let nonFnPropNames: [keyof T] = propNames.filter((propName: keyof JsonSerializable<T>) => {
            return !Utilities.isFunction(obj[propName]);
        }) as [keyof T];

        const proto = Object.getPrototypeOf(obj);

        if (proto !== Utilities.ObjectPrototype) {
            nonFnPropNames = nonFnPropNames.concat(this.getInheritedProps(proto) as [keyof T]) as [keyof T];
        }

        return nonFnPropNames;
    }

    private getPotentialMatches<T extends JsonSerializable<T>>(obj: T | JsonSerializable<T>, inheritedProps: [keyof JsonSerializable<T>]): PotentialPropertyMatch[] {
        const copy: JsonSerializable<T> = this.copyObject(obj);
        const potentialMatches: PotentialPropertyMatch[] = [];

        for (let i: number = 0; i < inheritedProps.length; ++i) {
            for (let j: number = 0; j < inheritedProps.length; ++j) {
                if (i === j) {
                    continue;
                }

                const iKey: keyof JsonSerializable<T> = inheritedProps[i];
                const jKey: keyof JsonSerializable<T> = inheritedProps[j];

                const iVal: any = copy[iKey];
                const jVal: any = copy[jKey];

                if ((Utilities.isPrimitive(iVal) && iVal === jVal) || this.equal(iVal, jVal)) {
                    let found: boolean = false;
                    for (let k: number = 0; k < potentialMatches.length; ++k) {
                        const potentialMatch: PotentialPropertyMatch = potentialMatches[k];
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

    private resolvePotentialMatches<T extends JsonSerializable<T>>(obj: T | JsonSerializable<T>, potentialMatches: PotentialPropertyMatch[]): [keyof JsonSerializable<T>] {
        const matches: string[] = [];

        for (let key in potentialMatches) {
            const copy: JsonSerializable<T> = this.copyObject(obj);
            const potentialMatch: PotentialPropertyMatch = potentialMatches[key];

            const potentialPrivateKey: string = copy.propertyIsEnumerable(potentialMatch.Key1)
                ? potentialMatch.Key1
                : copy.propertyIsEnumerable(potentialMatch.Key2)
                    ? potentialMatch.Key2
                    : "";

            const potentialPublicKey: string = copy.propertyIsEnumerable(potentialMatch.Key1)
                ? potentialMatch.Key2
                : copy.propertyIsEnumerable(potentialMatch.Key2)
                    ? potentialMatch.Key1
                    : "";

            let match: boolean = false;

            if (Utilities.isArray(copy[potentialPrivateKey]) && this.equal(copy[potentialPrivateKey], copy[potentialPublicKey])) {
                (copy[potentialPrivateKey] as any[]).push(1);
                match = this.equal(copy[potentialPrivateKey], copy[potentialPublicKey]);
            }
            else if (Utilities.isObject(copy[potentialPrivateKey]) && this.equal(copy[potentialPrivateKey], copy[potentialPublicKey])) {
                const _now: number = Date.now();
                (copy[potentialPrivateKey] as any)[_now] = _now;
                match = this.equal(copy[potentialPrivateKey], copy[potentialPublicKey]);
            }
            else if (Utilities.isPrimitive(copy[potentialPrivateKey]) && copy[potentialPrivateKey] === copy[potentialPublicKey]) {
                if (Utilities.isBoolean(copy[potentialPrivateKey])) {
                    (copy[potentialPrivateKey] as boolean) = !copy[potentialPrivateKey];
                }

                if (Utilities.isNumber(copy[potentialPrivateKey])) {
                    try {
                        (copy[potentialPrivateKey] as number) += 1;
                    }
                    catch {
                        (copy[potentialPrivateKey] as number) -= 1;
                    }
                }

                if (Utilities.isString(copy[potentialPrivateKey])) {
                    (copy[potentialPrivateKey] as string) += "_";
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

        return matches as [keyof JsonSerializable<T>];
    }

    public toJson(this: JsonSerializable<T>, obj: JsonSerializable<T> = this): any {
        const inheritedProps: [keyof JsonSerializable<T>] = this.getInheritedProps(obj);

        const potentialMatches: PotentialPropertyMatch[] = this.getPotentialMatches(obj, inheritedProps);

        potentialMatches.forEach((potentialMatch: PotentialPropertyMatch, i: number) => {
            const key1: keyof JsonSerializable<T> = potentialMatch.Key1 as keyof JsonSerializable<T>;
            if (obj.IgnoreFields.indexOf(key1) >= 0 && inheritedProps.indexOf(key1) >= 0) {
                inheritedProps.splice(inheritedProps.indexOf(key1), 1);
            }

            const key2: keyof JsonSerializable<T> = potentialMatch.Key2 as keyof JsonSerializable<T>;
            if (obj.IgnoreFields.indexOf(key2) >= 0 && inheritedProps.indexOf(key2) >= 0) {
                inheritedProps.splice(inheritedProps.indexOf(key2), 1);
            }
        });

        const matches: [keyof JsonSerializable<T>] = this.resolvePotentialMatches(obj, potentialMatches);

        for (let i: number = 0; i < matches.length; ++i) {
            const match: keyof JsonSerializable<T> = matches[i];

            const idx: number = inheritedProps.indexOf(match);
            if (idx >= 0 || obj.IgnoreFields && obj.IgnoreFields.indexOf(match) >= 0) {
                inheritedProps.splice(idx, 1);
            }
        }

        const ret: any = {};

        for (let key of inheritedProps) {
            if (obj.IgnoreFields && obj.IgnoreFields.indexOf(key) >= 0) {
                continue;
            }

            const value: any = obj[key];

            if (Utilities.isPrimitive(value)) {
                ret[key] = value;
            }
            else if (Utilities.isArray(value)) {
                ret[key] = [];
                for (let i: number = 0; i < (value as JsonSerializable<T>[]).length; ++i) {
                    const arrValue: any = obj[key][i];
                    if (Utilities.isPrimitive(arrValue)) {
                        ret[key].push(arrValue);
                    }
                    else if (Utilities.isObject(arrValue) && (arrValue as JsonSerializable<T>).toJson) {
                        ret[key].push(this.toJson(arrValue));
                    }
                }
            }
            else if (Utilities.isObject(value) && (value as JsonSerializable<T>).toJson) {
                ret[key] = this.toJson(value);
            }
        }

        return ret;
    }
}