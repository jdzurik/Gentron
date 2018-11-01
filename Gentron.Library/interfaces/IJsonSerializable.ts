export default interface IJsonSerializable<T extends Object> {
    /*
     *  Properties & Fields
     */
    IgnoreFields: [keyof T];


    /*
     *  Methods
     */
    toJson(this: IJsonSerializable<T>, obj: IJsonSerializable<T> , ignoreFields: [keyof T], includeFunctions: boolean): any;
}