import { IResultBase, ResultBase } from "./ResultBase";

export interface IFileOperationResult<T> extends IResultBase<T> { }

export class FileOperationResult<T> extends ResultBase<T> implements IFileOperationResult<T> { }