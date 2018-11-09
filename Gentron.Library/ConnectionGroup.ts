import { Cloneable } from "./abstract";
import { ConnectionBase } from "./ConnectionBase";
import { DatabaseConnection } from "./";
import { IModifiable } from "./interfaces";
import { JsonElementType, JsonObject, JsonProperty } from "ta-json";
import Utilities from "./Utilities";

@JsonObject()
export class ConnectionGroup<TConnection extends ConnectionBase<TConnection>> extends Cloneable<ConnectionGroup<TConnection>> implements IModifiable<ConnectionGroup<TConnection>> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    @JsonElementType(DatabaseConnection)
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


    public clone(): ConnectionGroup<TConnection> {
        const ret: ConnectionGroup<TConnection> = new ConnectionGroup<TConnection>();

        ret._id = this._id;
        ret.Connections = this.Connections.map((conn: TConnection, i: number) => {
            return conn.clone() as TConnection;
        });
        ret.Name = this.Name;

        return ret;
    }


    public update(connectionGroup: ConnectionGroup<TConnection>): void {
        if (!Utilities.hasValue(connectionGroup)) {
            return;
        }

        this.Connections = connectionGroup.Connections.map((conn: TConnection, i: number) => {
            return conn.clone() as TConnection;
        });
        this.Name = connectionGroup.Name;
    }
}