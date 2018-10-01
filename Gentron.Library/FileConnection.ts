import { ConnectionBase, IConnectionBase } from "./ConnectionBase";

export interface IFileConnection extends IConnectionBase {
    /*
     *  Properties & Fields 
     */
    Environment: string;
}

export class FileConnection extends ConnectionBase implements IFileConnection {
    /*
     *  Properties & Fields 
     */
    private _environment: string;

    public get Environment(): string {
        return this._environment;
    }

    public set Environment(value: string) {
        this._environment = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._environment = "";
    }


    /*
     *  Methods
     */
}