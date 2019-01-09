import { OutputPathGroup, OutputPath } from '../';
import { IPropertyConverter, JsonValue } from 'ta-json';

export default class ActiveOutputPathGroupConverter implements IPropertyConverter {
    public serialize(property: OutputPathGroup<OutputPath>): JsonValue {
        return {
            ID: property.ID
        };
    }

    public deserialize(_value: JsonValue) {
        const value: OutputPathGroup<OutputPath> = _value as any as OutputPathGroup<OutputPath>;
        const outputPathGroup: OutputPathGroup<OutputPath> = new OutputPathGroup<OutputPath>();
        (outputPathGroup as any)._id = value.ID;
        return outputPathGroup;
    }
}