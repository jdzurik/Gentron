import { IGentron } from "../../Gentron.Library";
import { IJsonSerializable } from "../../Gentron.Library/interfaces";

// The top-level state object
export interface ApplicationState extends IGentron { }
export type Nullable<T> = { [P in keyof T]: T[P] | null };
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export type Hash = { _hash?: string };
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export type Omit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never
export type Overwrite<T, U> = Omit<T, Extract<keyof T, keyof U>> & U;
export type HashedProps<T extends IJsonSerializable<T>> = Overwrite<Hash & NonFunctionProperties<T>, { IgnoreFields?: never }>;
export type NonHashedProps<T extends IJsonSerializable<T>> = Overwrite<NonFunctionProperties<T>, { IgnoreFields?: never }>;