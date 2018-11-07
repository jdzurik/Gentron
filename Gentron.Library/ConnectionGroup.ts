import { IConnectionBase, ConnectionBase } from "./ConnectionBase";
import { ICloneable, IModifiable } from "./interfaces";
import { Cloneable } from "./abstract";
import { JsonObject, JsonProperty, JsonElementType } from "ta-json";
import Utilities from "./Utilities";

export interface IConnectionGroup<TConnection extends IConnectionBase> extends ICloneable<IConnectionGroup<TConnection>>, IModifiable<IConnectionGroup<TConnection>> {
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

@JsonObject()
export class ConnectionGroup<TConnection extends IConnectionBase> extends Cloneable<IConnectionGroup<TConnection>> implements IConnectionGroup<TConnection> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(ConnectionBase)
    public Connections: TConnection[];

    @JsonProperty()
    public Name: string;


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.Connections = [];
        this.Name = "";
    }


    /*
     *  Methods
     */
    public addOrUpdateConnection(connection: TConnection): void {
        this.Connections.push(connection);
    }


    public removeConnection(connection: TConnection): void {

    }


    public clone(): IConnectionGroup<TConnection> {
        const ret: ConnectionGroup<TConnection> = new ConnectionGroup<TConnection>();

        ret._id = this._id;
        ret.Connections = this.Connections.map((conn: TConnection, i: number) => {
            return conn.clone() as TConnection;
        });
        ret.Name = this.Name;

        return ret;
    }


    public update(connectionGroup: IConnectionGroup<TConnection>): void {
        if (!Utilities.hasValue(connectionGroup)) {
            return;
        }

        this.Connections = connectionGroup.Connections.map((conn: TConnection, i: number) => {
            return conn.clone() as TConnection;
        });
        this.Name = connectionGroup.Name;
    }
}