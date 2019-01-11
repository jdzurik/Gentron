export type SwapSourcesDirection = "down" | "up";

export type KeyValuePair<K, V> = { Key: K, Value: V };
export type Nullable<T> = { [P in keyof T]?: T[P] | null };
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export type Hash = { _hash?: string };
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export type PrimitivePropertyNames<T> = { [K in keyof T]: T[K] extends number | string | boolean ? K : never }[keyof T];
export type PrimitiveProperties<T> = Pick<T, PrimitivePropertyNames<T>>;

export type ModuleList = {
    IncludeConsole: boolean;
    IncludeDirname: boolean;
    IncludeFilename: boolean;
    IncludeRequires: boolean;
    PackageList: ModulePackage[];
}

export type QuotationChar = '\'' | '"';

export type ModulePackage = {
    Delimeter: QuotationChar;
    IsBuiltInNodeModule: boolean;
    ModuleName: string;
    RelativeModulePath?: string;
}

export enum TemplateTypes {
    Partial,
    Primary,
}

const TemplateTypesCatalogKeys: string[] = Object.keys(TemplateTypes).filter(k => typeof TemplateTypes[k as any] === 'number');
const TemplateTypesCatalogValues: number[] = TemplateTypesCatalogKeys.map(k => TemplateTypes[k as any] as unknown as number);
export const TemplateTypesCatalog: KeyValuePair<string, number>[] = TemplateTypesCatalogKeys.map((key: string, index: number, arr: string[]) => {
    return { Key: key, Value: TemplateTypesCatalogValues[index] };
});