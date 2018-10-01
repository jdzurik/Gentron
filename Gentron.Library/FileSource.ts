import { SourceBase, ISourceBase } from "./SourceBase";

export interface IFileSource extends ISourceBase {

}

export class FileSource extends SourceBase implements IFileSource {

}