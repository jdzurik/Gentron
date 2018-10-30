import { Utilities } from ".";
import { IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";

export interface IOutputPath extends IJsonSerializable, Readonly<IIdentifiable>, IModifiable<IOutputPath> {
    /*
     *  Properties & Fields
     */
    Name: string;
    Path: string;
}

export class OutputPath implements IOutputPath {
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


    private _path: string;

    public get Path(): string {
        return this._path;
    }

    public set Path(value: string) {
        this._path = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Utilities.newCryptoGuid();
        this._name = "";
        this._path = "";
    }


    /*
     *  Methods
     */
    public toJson(): any {
        throw new Error("Method not implemented");
    }

    public update(ouputPath: IOutputPath): void {
        this._name = ouputPath.Name;
        this._path = ouputPath.Path;
    }
}