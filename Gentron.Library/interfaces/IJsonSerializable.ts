import { NonFunctionProperties } from "../types";

export default interface IJsonSerializable<T> {
    /*
     *  Methods
     */
    fromJson(json: NonFunctionProperties<T>): T;
    toJson(): NonFunctionProperties<T>;
}