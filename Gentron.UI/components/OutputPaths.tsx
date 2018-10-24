import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/ProjectSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { IOutputPath, OutputPath } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableOutputPaths = Hash & {
    OutputPaths?: NonFunctionProperties<IOutputPath>[];
};

type OutputPathsProps = NullableOutputPaths
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableOutputPaths, {}, OutputPathsProps>(mapStateToProps, mapDispatchToProps)
export default class OutputPaths extends React.Component<OutputPathsProps> {
    /*
     *  Constructors
     */
    public constructor(props: OutputPathsProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddOutputPathClick(): void {
        const ouputPath: IOutputPath = new OutputPath();
        ouputPath.Name = `OutputPath${this.props.OutputPaths.length}`;
        ouputPath.Path = new Date().getTime().toString();
        this.props.addOrUpdateOutputPath(ouputPath);
    }

    private handleRemoveOutputPathClick(outputPath: IOutputPath): void {
        this.props.removeOutputPath(outputPath);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-folder-open" title="Output Paths" />

                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>{` `}</th>
                                <th>Name</th>
                                <th>Path</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddOutputPathClick.bind(this)}>Add Output Path</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.OutputPaths.map((connection, i) =>
                                    <tr key={i}>
                                        <td>{` `}</td>
                                        <td>{connection.Name}</td>
                                        <td>{connection.Path}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveOutputPathClick.bind(this, connection)}>Remove</button>
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

function mapStateToProps(state: ApplicationState): NullableOutputPaths {
    const _hash: string = hash(state.ProjectSettings.OutputPaths);
    return {
        OutputPaths: state.ProjectSettings.OutputPaths,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}