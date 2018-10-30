import { IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";
import { TemplateTypes } from "./Types";
import { Utilities } from ".";

export interface ITemplate extends IJsonSerializable, Readonly<IIdentifiable>, IModifiable<ITemplate> {
    Name: string;
    Type: TemplateTypes;
}

export class Template implements ITemplate {
    /*
     *  Properties & Fields
     */
    private readonly _id: string;

    public get ID(): string {
        return this._id;
    }


    private _name: string;

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }


    private _type: TemplateTypes;

    public get Type(): TemplateTypes {
        return this._type;
    }

    public set Type(value: TemplateTypes) {
        this._type = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Utilities.newGuid();
        this._name = "";
        this._type = TemplateTypes.Partial;
    }


    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public update(template: ITemplate): void {
        this._name = template.Name;
        this._type = template.Type;
    }
}