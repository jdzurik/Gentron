import { ConnectionGroup, IConnectionGroup, IDatabaseConnection, File, IFile } from ".";
import { ISourceBase, SourceBase } from "./SourceBase";

export interface IDatabaseSource extends ISourceBase {
    /*
     *  Properties & Fields 
     */
    ActiveConnectionGroup: IConnectionGroup<IDatabaseConnection>;
    Script?: IFile;
}

export class DatabaseSource extends SourceBase implements IDatabaseSource {
    /*
     *  Properties & Fields 
     */
    private _activeConnectionGroup: IConnectionGroup<IDatabaseConnection>;

    public get ActiveConnectionGroup(): IConnectionGroup<IDatabaseConnection> {
        return this._activeConnectionGroup;
    }

    public set ActiveConnectionGroup(value: IConnectionGroup<IDatabaseConnection>) {
        this._activeConnectionGroup = value;
    }


    private _script: IFile;

    public get Script(): IFile {
        return this._script;
    }

    public set Script(value: IFile) {
        this._script = value;
    }


    /*
     *  Constructors
     */
    public constructor() {
        super();
        this._activeConnectionGroup = new ConnectionGroup<IDatabaseConnection>();
        this._script = new File();
    }


    /*
     *  Methods
     */
    public update(databaseSource: IDatabaseSource): void {
        if (typeof (databaseSource) === typeof (undefined) || databaseSource === null) {
            return;
        }

        this.ActiveConnectionGroup = databaseSource.ActiveConnectionGroup;
        this.IsActive = databaseSource.IsActive;
        this.Name = databaseSource.Name;
        this.Result = databaseSource.Result;

        this.Script.update(databaseSource.Script as IFile);
        //if (Utilities.hasValue(this.Script)
        //    && Utilities.hasValue(databaseSource.Script)
        //    && this.Script.Path !== databaseSource.Script.Path) {
        //}
    }
}