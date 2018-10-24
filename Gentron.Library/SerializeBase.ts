export interface ISerializeBase<T> {
    /*
     *  Properties & Fields 
     */
    IgnoreFields: [keyof T];

    /*
     *  Methods
     */
    toJson(ignoreFields: string[]): T;
}

export abstract class SerializeBase {
    /*
     *  Properties & Fields 
     */
    public IgnoreFields: string[];


    /*
     *  Constructors
     */
    constructor() {
        this.IgnoreFields = [];
    }


    /*
     *  Methods
     */
    public toJson(ignoreFields: string[] = this.IgnoreFields): any {
        const keys: string[] = Object.keys(this);
        const nonIgnoredKeys: any = {};

        for (let key of keys) {
            if (key !== "IgnoreFields" && ignoreFields.indexOf(key) < 0) {
                if (this[key].__proto__ instanceof SerializeBase) {
                    nonIgnoredKeys[key] = this[key].toJson();
                }
                else if ((this[key] as any).toJson) {
                    nonIgnoredKeys[key] = this[key].__proto__.toJson();
                }
                else {
                    nonIgnoredKeys[key] = this[key];
                }
            }
        }

        return nonIgnoredKeys;
    }
}