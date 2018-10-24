import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { Engine, IEngine } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableEngines = Hash & {
    Engines?: NonFunctionProperties<IEngine>[];
};

type EnginesProps = NullableEngines
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableEngines, {}, EnginesProps>(mapStateToProps, mapDispatchToProps)
export default class Engines extends React.Component<EnginesProps> {
    /*
     *  Constructors
     */
    public constructor(props: EnginesProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddEngineClick(): void {
        const source: IEngine = new Engine();
        source.Name = `Engine${this.props.Engines.length}`;

        this.props.addOrUpdateEngine(source);
    }

    private handleRemoveEngineClick(source: IEngine): void {
        this.props.removeEngine(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-http" title="Template Engines" />

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
                                    <button className="button" onClick={this.handleAddEngineClick.bind(this)}>Add Source</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.Engines.map((source, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/engines/manage/${i}`}>
                                                <button className="button">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                        <td>{source.Name}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveEngineClick.bind(this, source)}>Remove</button>
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

function mapStateToProps(state: ApplicationState): NullableEngines {
    const _hash: string = hash(state.PackageSettings.Engines);
    return {
        Engines: state.PackageSettings.Engines,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}