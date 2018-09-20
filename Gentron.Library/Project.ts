export default class Project {
    /*
     *  Properties & Fields 
     */


    /*
     *  Constructors
     */
    public constructor() { }


    /*
     *  Methods
     */
    public static fromJson(jsonStr: string): Project {
        return JSON.parse(jsonStr) as Project;
    }

    public static toJson(projectObj: Project): string {
        return JSON.stringify(projectObj);
    }
}