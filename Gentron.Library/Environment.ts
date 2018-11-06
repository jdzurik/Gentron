import { ICloneable, IModifiable, IActivateable } from "./interfaces";
import { Cloneable } from "./abstract";
import { JsonObject, JsonProperty } from "ta-json";

export interface IEnvironment extends IActivateable, ICloneable<IEnvironment>, IModifiable<IEnvironment> {
    /*
     *  Properties & Fields
     */
    Name: string;
}

@JsonObject()
export class Environment extends Cloneable<IEnvironment> implements IEnvironment {
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
        this.Name = "";
    }


    /*
     *  Methods
     */
    public clone(): IEnvironment {
        const ret: Environment = new Environment();

        ret._id = this._id;
        ret.IsActive = this.IsActive;
        ret.Name = this.Name;

        return ret;
    }

    public update(environment: IEnvironment): void {
        this.IsActive = environment.IsActive;
        this.Name = environment.Name;
    }
}