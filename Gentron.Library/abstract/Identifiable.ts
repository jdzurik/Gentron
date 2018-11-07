import { IIdentifiable } from "../interfaces";
import { JsonObject, JsonProperty } from "ta-json";
import { Utilities } from "../";

@JsonObject()
export default abstract class Identifiable implements IIdentifiable {
    /*
     *  Properties & Fields 
     */
    @JsonProperty("ID")
    protected _id: string;

    public get ID(): string {
        return this._id;
    }


    /*
     *  Constructors
     */
    public constructor() {
        this._id = Utilities.newCryptoGuid();
    }
}