export default class ParentableArray<T> extends Array<T> {
    public Parent : any;
    public constructor(...args:T[]) {
        super(...args);
        this.Parent = null;

    }
    push(...args:T[]) {
        return super.push(...args);
    }
}