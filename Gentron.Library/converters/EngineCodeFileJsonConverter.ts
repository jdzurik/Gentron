import { EngineCodeFile, ObjectUtils } from '..';
import { IPropertyConverter, JsonValue } from 'ta-json';
import { ModulePackage } from '../types';

export default class EngineCodeFileJsonConverter implements IPropertyConverter {
    public serialize(property: EngineCodeFile): JsonValue {
        property.writeContents();

        const ret: JsonValue = {};
        ret.ID = property.ID;
        ret.Path = property.Path;
        ret.IncludeConsole = property.IncludeConsole;
        ret.IncludeDirname = property.IncludeDirname;
        ret.IncludeFilename = property.IncludeFilename;
        ret.IncludeRequires = property.IncludeRequires;
        ret.PackageList = (property.PackageList || []).map((module: ModulePackage, index: number, arr: ModulePackage[]) => {
            return { ...module! } as JsonValue;
        });

        if (ObjectUtils.hasValue(property.LastModified)) {
            let dateStr: string = '';

            try {
                dateStr = (property.LastModified as Date).toDateString();
            }
            catch { }

            if (!isNaN(Date.parse(dateStr))) {
                ret.LastModified = dateStr;
            }
        }

        return ret;
    }

    public deserialize(_value: JsonValue) {
        const value: EngineCodeFile = _value as any as EngineCodeFile;
        const file: EngineCodeFile = new EngineCodeFile();
        (file as any)._id = value.ID;

        try {
            file.LastModified = new Date(Date.parse((_value as any).LastModified as string));
        }
        catch { }

        file.Path = value.Path;
        file.loadContents();
        file.IncludeConsole = value.IncludeConsole;
        file.IncludeDirname = value.IncludeDirname;
        file.IncludeFilename = value.IncludeFilename;
        file.IncludeRequires = value.IncludeRequires;
        file.PackageList = (value.PackageList || []).map((module: ModulePackage, index: number, arr: ModulePackage[]) => {
            return { ...module };
        });

        return file;
    }
}