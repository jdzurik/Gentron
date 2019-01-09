import { ICloneable, IIdentifiable } from '../interfaces';
import { Identifiable } from './';
import { JsonObject } from 'ta-json';

@JsonObject()
export default abstract class Cloneable<T> extends Identifiable implements ICloneable<T>, IIdentifiable {
    /*
     *  Properties & Fields
     */


    /*
     *  Constructors
     */
    public constructor() {
        super();
    }


    /*
     *  Methods
     */
    public abstract clone(): T;
}