import { IJsonSerializable } from "./";

export default interface ICloneable<T> extends IJsonSerializable<T> {
    /*
     *  Properties & Methods
     */
    readonly ID: string;
    _cloneId: string;
    _isClone: boolean;


    /*
     *  Methods
     */
    clone(): T;
}