import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from "redux";
import { ButtonHelpers } from "../helpers";
import { Hash } from "../../Gentron.Library/types";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IGentron, ConnectionGroup, DatabaseConnection, Environment, Utilities } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableDatabaseConnections = Hash & {
    DatabaseConnections?: ConnectionGroup<DatabaseConnection>[];
    Environments?: Environment[];
};

type DatabaseConnectionsProps = NullableDatabaseConnections
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{}>;

type DatabaseConnectionsState = {
    EditingConnectionGroup: ConnectionGroup<DatabaseConnection>;
};

@connect<NullableDatabaseConnections, {}, DatabaseConnectionsProps>(mapStateToProps, mapDispatchToProps)
export default class DatabaseConnections extends React.Component<DatabaseConnectionsProps, DatabaseConnectionsState> {
    /*
     *  Constructors
     */
    public constructor(props: DatabaseConnectionsProps, state: DatabaseConnectionsState) {
        super(props);
        this.state = {
            EditingConnectionGroup: null
        };
    }


    /*
     *  Methods
     */
    private handleAddConnectionClick(): void {
        this.handleOpenEditConnectionClick(new ConnectionGroup<DatabaseConnection>());
    }

    private handleRemoveConnectionClick(connectionGroup: ConnectionGroup<DatabaseConnection>): void {
        this.props.removeDatabaseConnectionGroup(connectionGroup);
    }

    private handleOpenEditConnectionClick(connectionGroup: ConnectionGroup<DatabaseConnection>): void {
        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign({}, prevState, { EditingConnectionGroup: connectionGroup.clone() });
        });
    }

    private handleEditConnectionNameChange(name: string): void {
        const editingConnectionGroup: ConnectionGroup<DatabaseConnection> = this.state.EditingConnectionGroup;
        editingConnectionGroup.Name = name;
        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign({}, prevState, { EditingConnectionGroup: editingConnectionGroup });
        });
    }

    private handleEditConnectionStringChange(environment: Environment, connStr): void {
        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign(
                {},
                prevState,
                {
                    Connections: prevState.EditingConnectionGroup.Connections.map((conn: DatabaseConnection, i: number) => {
                        if (conn.Environment === environment.Name) {
                            conn.ConnectionString = connStr;
                        }

                        return conn;
                    })
                });
        });
    }

    private handleCloseEditConnectionClick(save: boolean): void {
        if (save) {
            this.props.addOrUpdateDatabaseConnectionGroup(this.state.EditingConnectionGroup);
        }

        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign({}, prevState, { EditingConnectionGroup: null });
        });
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-settings-ethernet" title="Database Connections" />
                    
                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Connections</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddConnectionClick.bind(this)}>
                                        <span className="mif-add"></span>
                                    </button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.DatabaseConnections.map((connection: ConnectionGroup<DatabaseConnection>, i: number, array: ConnectionGroup<DatabaseConnection>[]) =>
                                    <tr key={i}>
                                        <td>
                                            <span>{connection.Name}</span>
                                        </td>
                                        <td>{connection.Connections.length}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button"
                                                    onClick={() => this.handleOpenEditConnectionClick(connection)}>
                                                    <span className="mif-pencil"></span>
                                                </button>
                                                <button className="button ml-2" onClick={this.props.swapProjectItemSourceOrder.bind(null, array, i, `down`)} {...ButtonHelpers.swapBtnProps(array, i, `down`)}>
                                                    <span className="mif-arrow-down"></span>
                                                </button>
                                                <button className="button ml-2" onClick={this.props.swapProjectItemSourceOrder.bind(null, array, i, `up`)} {...ButtonHelpers.swapBtnProps(array, i, `up`)}>
                                                    <span className="mif-arrow-up"></span>
                                                </button>
                                                <button className="button ml-2" onClick={this.handleRemoveConnectionClick.bind(this, connection)}>
                                                    <span className="mif-bin"></span>
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Grid>

                {
                    Utilities.hasValue(this.state.EditingConnectionGroup)
                        ? (
                            <Dialog>
                                <DialogTitle>Edit Connection</DialogTitle>
                                <DialogContent>
                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <label>Connection Name</label>
                                        </Cell>
                                    </Row>

                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <input type="text"
                                                data-role="input"
                                                data-role-input="true"
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditConnectionNameChange(ev.target.value)}
                                                value={this.state.EditingConnectionGroup.Name}
                                            />
                                        </Cell>
                                    </Row>

                                    {
                                        this.props.Environments.map((env: Environment, i: number) => {
                                            let currConnection: DatabaseConnection = this.state.EditingConnectionGroup.Connections.find(conn => conn.Environment === env.Name);

                                            if (!Utilities.hasValue(currConnection)) {
                                                currConnection = new DatabaseConnection();
                                                currConnection.Environment = env.Name;
                                                this.state.EditingConnectionGroup.addOrUpdateConnection(currConnection);
                                            }

                                            return (
                                                <React.Fragment key={i}>
                                                    <Row className="mb-2 mt-2">
                                                        <Cell>
                                                            <label>{env.Name} Connection String</label>
                                                        </Cell>
                                                    </Row>

                                                    <Row className="mb-2 mt-2">
                                                        <Cell>
                                                            <input type="text"
                                                                data-role="input"
                                                                data-role-input="true"
                                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditConnectionStringChange(env, ev.target.value)}
                                                                value={currConnection.ConnectionString}
                                                            />
                                                        </Cell>
                                                    </Row>
                                                </React.Fragment>
                                            );
                                        })
                                    }

                                </DialogContent>
                                <DialogAction>
                                    <button className="button" onClick={this.handleCloseEditConnectionClick.bind(this, false)}>Cancel</button>
                                    <button className="button" onClick={this.handleCloseEditConnectionClick.bind(this, true)}>Save</button>
                                </DialogAction>
                            </Dialog>
                        )
                        : null
                }
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron): NullableDatabaseConnections {
    const _dbHash: string = hash(state.ProjectSettings.DatabaseConnections);
    const _envHash: string = hash(state.PackageSettings.Environments);
    const _hash: string = hash(_dbHash + _envHash);
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        Environments: state.PackageSettings.Environments,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}