import { IConnectionBase } from "./ConnectionBase";
import { ICloneable, IIdentifiable, IJsonSerializable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";

export interface IConnectionGroup<TConnection extends IConnectionBase> extends ICloneable<IConnectionGroup<TConnection>>, IJsonSerializable<IConnectionGroup<TConnection>>, IIdentifiable, IModifiable<IConnectionGroup<TConnection>> {
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

export class ConnectionGroup<TConnection extends IConnectionBase> extends Cloneable<IConnectionGroup<TConnection>> implements IConnectionGroup<TConnection> {
    /*
     *  Properties & Fields 
     */
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
        super();
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

    public clone(): IConnectionGroup<TConnection> {
        const ret: ConnectionGroup<TConnection> = new ConnectionGroup<TConnection>();

        ret._cloneId = this.ID;
        ret._connections = this._connections.map((conn: TConnection, i: number) => conn.clone() as TConnection);
        ret._isClone = true;
        ret._name = this._name;

        return ret;
    }

    public update(connection: IConnectionGroup<TConnection>): void {
        this._connections = connection.Connections.map((conn: TConnection, i: number) => conn.clone() as TConnection);
        this._name = connection.Name;
    }
}