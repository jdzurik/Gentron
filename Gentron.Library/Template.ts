import { IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";
import { Utilities } from ".";
import { NonFunctionProperties } from "./types";

export enum TemplateTypes {
    Partial,
    Primary,
}

export interface ITemplate extends IJsonSerializable<ITemplate>, IIdentifiable, IModifiable<ITemplate> {
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
    public fromJson(json: NonFunctionProperties<ITemplate>): ITemplate {
        this._name = json.Name;
        this._type = json.Type;

        return this;
    }

    public toJson(): NonFunctionProperties<ITemplate> {
        return {
            ID: this._id,
            Name: this._name,
            Type: this._type
        };
    }

    public update(template: ITemplate): void {
        this._name = template.Name;
        this._type = template.Type;
    }
}