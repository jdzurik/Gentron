import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { DatabaseSource, IDatabaseSource } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableDatabaseSources = Hash & {
    DatabaseSources?: NonFunctionProperties<IDatabaseSource>[];
};

type DatabaseSourcesProps = NullableDatabaseSources
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableDatabaseSources, {}, DatabaseSourcesProps>(mapStateToProps, mapDispatchToProps)
export default class DatabaseSources extends React.Component<DatabaseSourcesProps> {
    /*
     *  Constructors
     */
    public constructor(props: DatabaseSourcesProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddSourceClick(): void {
        const source: IDatabaseSource = new DatabaseSource();
        source.Name = `DBSource${this.props.DatabaseSources.length}`;

        this.props.addOrUpdateDatabaseSource(source);
    }

    private handleRemoveSourceClick(source: IDatabaseSource): void {
        this.props.removeDatabaseSource(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-database" title="Database Sources" />

                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>{` `}</th>
                                <th>Name</th>
                                <th>Connections</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddSourceClick.bind(this)}>Add Database Source</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.DatabaseSources.map((source, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/sources/db/${i}`}>
                                                <button className="button">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                        <td>{source.Name}</td>
                                        <td>{source.ActiveConnectionGroup.Connections.length}</td>
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

function mapStateToProps(state: ApplicationState): NullableDatabaseSources {
    const _hash: string = hash(state.PackageSettings.DatabaseSources);
    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}