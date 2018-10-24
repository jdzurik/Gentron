export default interface IModifiable<TInterface> {
    /*
     *  Methods
     */
    update(updated: TInterface): void;
}