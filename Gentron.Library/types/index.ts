﻿export type Nullable<T> = { [P in keyof T]: T[P] | null };
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export type Hash = { _hash?: string };
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type PrimitivePropertyNames<T> = { [K in keyof T]: T[K] extends number | string | boolean ? K : never }[keyof T];
export type PrimitiveProperties<T> = Pick<T, PrimitivePropertyNames<T>>;