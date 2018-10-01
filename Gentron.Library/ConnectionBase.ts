export interface IConnectionBase {
    /*
     *  Properties & Fields 
     */
    IsActive: boolean;
}

export abstract class ConnectionBase implements IConnectionBase {
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


    /*
     *  Constructors
     */
    public constructor() {
        this._isActive = true;
    }


    /*
     *  Methods
     */
}