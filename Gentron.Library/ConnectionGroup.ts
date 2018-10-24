import { IConnectionBase } from "./ConnectionBase";
import Guid from "./utils/Guid";
import IIdentifiable from "./interfaces/IIdentifiable";
import IJsonSerializable from "./interfaces/IJsonSerializable";
import IModifiable from "./interfaces/IModifiable";

export interface IConnectionGroup<TConnection extends IConnectionBase> extends IJsonSerializable, IIdentifiable, IModifiable<IConnectionGroup<TConnection>> {
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
        throw new Error("Method not implemented");
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