import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IFileSource } from "../../Gentron.Library";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

type HashedFileSource = Hash & {
    FileSource?: NonFunctionProperties<IFileSource>;
};

type FileSourceProps = HashedFileSource
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedFileSource, {}, FileSourceProps>(mapStateToProps, mapDispatchToProps)
export default class FileSource extends React.Component<FileSourceProps> {
    /*
     *  Constructors
     */
    public constructor(props: FileSourceProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleNameClick(source: IFileSource): void {
        source.Name = "Test";
        this.props.addOrUpdateFileSource(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <Row>
                        <Cell colSpan={12}>
                            <h3>
                                <span className="mif-file-code mif-md mr-2"></span>
                                <span onClick={this.handleNameClick.bind(this, this.props.FileSource)}>{this.props.FileSource.Name}</span>
                            </h3>
                        </Cell>
                    </Row>

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <Link to="/sources/file">
                                <button className="button">
                                    Return to All Sources
                                </button>
                            </Link>
                        </Cell>
                    </Row>

                    <h1>{this.props.match.params.id}</h1>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ id: string }>): HashedFileSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.FileSources[id] || "")
    return {
        FileSource: state.PackageSettings.FileSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}