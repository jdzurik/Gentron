import { Cloneable } from "./abstract";
import { IActivateable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";

@JsonObject()
export default abstract class ConnectionBase<T> extends Cloneable<T> implements IActivateable, IModifiable<T> {
    /*
     *  Properties & Fields 
     */
    @JsonProperty()
    public IsActive: boolean;

    @JsonProperty()
    public Name: string;

    @JsonProperty()
    public Username: string;

    @JsonProperty()
    public Password: string;

    /*
     *  Constructors
     */
    public constructor() {
        super();
        this.IsActive = true;
        this.Name = '';
        this.Username = '';
        this.Password = '';
    }


    /*
     *  Methods
     */
    public abstract clone(): T;

    public abstract update(connection: T): void;



}