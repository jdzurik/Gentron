import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from "redux";
import { Hash } from "../../Gentron.Library/types";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IGentron, ConnectionGroup, DatabaseConnection, IConnectionGroup, IDatabaseConnection, IEnvironment, Utilities } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableDatabaseConnections = Hash & {
    DatabaseConnections?: IConnectionGroup<IDatabaseConnection>[];
    Environments?: IEnvironment[];
};

type DatabaseConnectionsProps = NullableDatabaseConnections
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{}>;

type DatabaseConnectionsState = {
    EditingConnectionGroup: IConnectionGroup<IDatabaseConnection>;
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
        this.handleOpenEditConnectionClick(new ConnectionGroup<IDatabaseConnection>());
    }

    private handleRemoveConnectionClick(connectionGroup: IConnectionGroup<IDatabaseConnection>): void {
        this.props.removeDatabaseConnectionGroup(connectionGroup);
    }

    private handleOpenEditConnectionClick(connectionGroup: IConnectionGroup<IDatabaseConnection>): void {
        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign({}, prevState, { EditingConnectionGroup: connectionGroup.clone() });
        });
    }

    private handleEditConnectionNameChange(name: string): void {
        const editingConnectionGrp: IConnectionGroup<IDatabaseConnection> = this.state.EditingConnectionGroup;
        editingConnectionGrp.Name = name;
        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign({}, prevState, { EditingConnectionGroup: editingConnectionGrp });
        });
    }

    private handleEditConnectionStringChange(environment: IEnvironment, connStr): void {
        this.setState((prevState: Readonly<DatabaseConnectionsState>) => {
            return Object.assign(
                {},
                prevState,
                {
                    Connections: prevState.EditingConnectionGroup.Connections.map((conn: IDatabaseConnection, i: number) => {
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
                                this.props.DatabaseConnections.map((connection: IConnectionGroup<IDatabaseConnection>, i: number) =>
                                    <tr key={i}>
                                        <td>
                                            <button className="button"
                                                onClick={() => this.handleOpenEditConnectionClick(connection)}>
                                                <span className="mif-pencil"></span>
                                            </button>
                                        </td>
                                        <td>{connection.Name}</td>
                                        <td>{connection.Connections.length}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveConnectionClick.bind(this, connection)}>
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
                                        this.props.Environments.map((env: IEnvironment, i: number) => {
                                            let currConnection: IDatabaseConnection = this.state.EditingConnectionGroup.Connections.find(conn => conn.Environment === env.Name);

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