import { IConnectionBase } from "./ConnectionBase";

export interface IConnectionGroup<TConnection extends IConnectionBase> {
    /*
     *  Properties & Fields 
     */
    Connections: TConnection[];
    Name: string;

    /*
     *  Methods
     */
    addOrUpdateConnection(connection: TConnection): void;
    removeConnection(connection: TConnection): void;
}

export class ConnectionGroup<TConnection extends IConnectionBase> implements IConnectionGroup<TConnection> {
    /*
     *  Properties & Fields 
     */
    private _connections: TConnection[];

    public get Connections(): TConnection[] {
        return this._connections;
    }

    public set Connections(value: TConnection[]) {
        this._connections = value;
    }

    private _name: string;

    public get Name(): string {
        return this._name;
    }

    public set Name(value: string) {
        this._name = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._connections = [];
        this._name = "";
    }


    /*
     *  Methods
     */
    public addOrUpdateConnection(connection: TConnection): void {

    }

    public removeConnection(connection: TConnection): void {

    }
}