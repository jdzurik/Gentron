import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { FileSource, IFileSource } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableFileSources = Hash &{
    FileSources?: NonFunctionProperties<IFileSource>[];
};

type FileSourcesProps = NullableFileSources
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableFileSources, {}, FileSourcesProps>(mapStateToProps, mapDispatchToProps)
export default class FileSources extends React.Component<FileSourcesProps> {
    /*
     *  Constructors
     */
    public constructor(props: FileSourcesProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddSourceClick(): void {
        const source: IFileSource = new FileSource();
        source.Name = `FileSource${this.props.FileSources.length}`;

        this.props.addOrUpdateFileSource(source);
    }

    private handleRemoveSourceClick(source: IFileSource): void {
        this.props.removeFileSource(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-file-code" title="File Sources" />

                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>{` `}</th>
                                <th>Name</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddSourceClick.bind(this)}>Add File Source</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.FileSources.map((source, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/sources/file/${i}`}>
                                                <button className="button">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                        <td>{source.Name}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveSourceClick.bind(this, source)}>Remove</button>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState): NullableFileSources {
    const _hash: string = hash(state.PackageSettings.FileSources);
    return {
        FileSources: state.PackageSettings.FileSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}