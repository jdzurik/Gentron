import { IGentron } from "../../Gentron.Library";

// The top-level state object
export interface ApplicationState extends IGentron { }
export type Nullable<T> = {
    [P in keyof T]: T[P] | null
};
export type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function
        ? K
        : never
}[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export type Hash = { _hash?: string };
export type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function
        ? never
        : K
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;