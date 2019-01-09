import { Cloneable } from "./abstract";
import { IActivateable, ICloneable, IModifiable } from "./interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { ObjectUtils } from "./";

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
    public constructor() {
        super();
        this.IsActive = false;
        this.Name = '';
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