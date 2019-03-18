import Result from './Result';
import FileResult from './FileResult';
import { Gentron, IGentron, File } from '../';

export type TGentronFsResult = {
    InfoMessage?: string;
    Gentron?: IGentron;
};

export type TDataSourceResult = {
    Json: string;
    Object: any;
    Xml: string;
};

export type TGentronResult = {
    InfoMessage?: string;
    Files: FileResult[];
};

export {
    Result,
};
