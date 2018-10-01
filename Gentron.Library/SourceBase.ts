export interface ISourceBase {
    /*
     *  Properties & Fields 
     */
    IsActive: boolean;
    Name: string;
}

export abstract class SourceBase implements ISourceBase {
    /*
     *  Properties & Fields 
     */
    private _isActive: boolean;

    public get IsActive(): boolean {
        return this._isActive;
    }

    public set IsActive(value: boolean) {
        this._isActive = value;
    }


    private _name: string;

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }


    private _result: string;

    public get Result(): string {
        return this._result;
    }

    public set Result(value: string) {
        this._result = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._isActive = true;
        this._name = "";
        this._result = "";
    }


    /*
     *  Methods
     */
}