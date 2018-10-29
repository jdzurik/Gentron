import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/ProjectSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { ConnectionGroup, IConnectionGroup, DatabaseConnection, IDatabaseConnection } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableDatabaseConnections = Hash & {
    DatabaseConnections?: NonFunctionProperties<IConnectionGroup<IDatabaseConnection>>[];
};

type DatabaseConnectionsProps = NullableDatabaseConnections
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableDatabaseConnections, {}, DatabaseConnectionsProps>(mapStateToProps, mapDispatchToProps)
export default class DatabaseConnections extends React.Component<DatabaseConnectionsProps> {
    /*
     *  Constructors
     */
    public constructor(props: DatabaseConnectionsProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddConnectionClick(): void {
        const connectionGroup: IConnectionGroup<IDatabaseConnection> = new ConnectionGroup<IDatabaseConnection>();
        connectionGroup.Name = `DBConn${this.props.DatabaseConnections.length}`;

        ["Dev", "Test", "Prod"].map((environment, i) => {
            const dbConn: IDatabaseConnection = new DatabaseConnection();

            dbConn.ConnectionString = hash(environment);
            dbConn.Environment = environment;

            connectionGroup.addOrUpdateConnection(dbConn);
        });

        this.props.addOrUpdateDatabaseConnectionGroup(connectionGroup);
    }

    private handleRemoveConnectionClick(connectionGroup: IConnectionGroup<IDatabaseConnection>): void {
        this.props.removeDatabaseConnectionGroup(connectionGroup);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-settings-ethernet" title="Database Connections" />

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
                                    <button className="button" onClick={this.handleAddConnectionClick.bind(this)}>Add Connection</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.DatabaseConnections.map((connection, i) =>
                                    <tr key={i}>
                                        <td>{` `}</td>
                                        <td>{connection.Name}</td>
                                        <td>{connection.Connections.length}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveConnectionClick.bind(this, connection)}>Remove</button>
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

function mapStateToProps(state: ApplicationState): NullableDatabaseConnections {
    const _hash: string = hash(state.ProjectSettings.DatabaseConnections);
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}