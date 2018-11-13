import Result from "./Result";
import { IGentron } from "../";

export type TGentronFsResult = {
    InfoMessage?: string;
    Gentron?: IGentron;
};

export type TDataSourceResult = {
    Json: string;
    Object: any;
    Xml: string;
}

export {
    Result
};