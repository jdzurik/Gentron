import { SourceBase, ISourceBase } from "./SourceBase";

export interface IHttpSource extends ISourceBase {

}

export class HttpSource extends SourceBase implements IHttpSource {

}