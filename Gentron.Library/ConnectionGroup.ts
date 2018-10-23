import { IConnectionBase } from "./ConnectionBase";
import IJsonSerializable from "./interfaces/IJsonSerializable";
import Guid from "./utils/Guid";

export interface IConnectionGroup<TConnection extends IConnectionBase> extends IJsonSerializable {
    /*
     *  Properties & Fields 
     */
    readonly ID: string;
    Connections: TConnection[];
    Name: string;

    /*
     *  Methods
     */
    addOrUpdateConnection(connection: TConnection): void;
    removeConnection(connection: TConnection): void;
    update(connection: IConnectionGroup<TConnection>): void;
}

export class ConnectionGroup<TConnection extends IConnectionBase> implements IConnectionGroup<TConnection> {
    /*
     *  Properties & Fields 
     */
    private readonly _id: string;

    public get ID(): string {
        return this._id;
    }

    private _connections: TConnection[];

    public get Connections(): TConnection[] {
        return (this._connections || []).slice();
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
        this._id = Guid.newCryptoGuid();
        this._connections = [];
        this._name = "";
    }


    /*
     *  Methods
     */
    public addOrUpdateConnection(connection: TConnection): void {
        this._connections.push(connection);
    }

    public removeConnection(connection: TConnection): void {

    }

    public toJson(): any {

    }

    public update(connection: IConnectionGroup<TConnection>): void {
        for (let i: number = 0; i < this.Connections.length; ++i) {
            for (let j: number = 0; j < connection.Connections.length; ++j) {
                if (this.Connections[i].ID === connection.Connections[j].ID) {
                    this.Connections[i].update(connection.Connections[j]);
                }
            }
        }
    }
}