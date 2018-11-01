import { IIdentifiable } from ".";

export default interface ICloneable<T> extends IIdentifiable {
    /*
     *  Methods
     */
    clone(): T;
}