import { IIdentifiable, IJsonSerializable, IModifiable, ICloneable } from "./interfaces";
import { Utilities } from ".";
import { NonFunctionProperties } from "./types";
import { Cloneable } from "./abstract";

export enum TemplateTypes {
    Partial,
    Primary,
}

export interface ITemplate extends ICloneable<ITemplate>, IJsonSerializable<ITemplate>, IModifiable<ITemplate> {
    Name: string;
    Type: TemplateTypes;
}

export class Template extends Cloneable<ITemplate> implements ITemplate {
    /*
     *  Properties & Fields
     */
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
        super();
        this._id = Utilities.newCryptoGuid();
        this._name = "";
        this._type = TemplateTypes.Partial;
    }


    /*
     *  Methods
     */
    public clone(): ITemplate {
        const ret: Template = new Template();

        ret._id = this._id;
        ret._name = this._name;
        ret._type = this._type;

        return ret;
    }

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