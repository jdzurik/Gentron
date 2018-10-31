export default interface IJsonSerializable<T extends Object> {
    /*
     *  Properties & Fields
     */
    IgnoreFields: [keyof T];


    /*
     *  Methods
     */
    toJson(): any;
}