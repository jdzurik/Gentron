import { Cloneable } from "./abstract";
import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";
import { Nullable, NonFunctionProperties } from "./types";
import { stringify } from "querystring";

@JsonObject()
export default class Environment extends Cloneable<Environment> implements IActivateable, ICloneable<Environment>, IModifiable<Environment> {
    /*
     *  Properties & Fields
     */
    @JsonProperty()
    public IsActive: boolean;

    @JsonProperty()
    public Name: string;


    /*
     *  Constructors
     */
    public constructor();
    public constructor(props: Nullable<NonFunctionProperties<Environment>>);
    public constructor(props: Nullable<NonFunctionProperties<Environment>> = { IsActive: false, Name: '' }) {
        super();
       (props.IsActive)?this.IsActive = true:this.IsActive = false;
       this.Name = String(props.Name);

    }


    /*
     *  Methods
     */
    public clone(): Environment {
        const ret: Environment = new Environment();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;

        return ret;
    }

    public update(environment: Environment): void {
        if (!ObjectUtils.hasValue(environment)) {
            return;
        }

        this.IsActive = environment.IsActive;
        this.Name = environment.Name;
    }
}