import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { ButtonHelpers } from "../helpers";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, Grid, Row, Switch } from "./metro";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, ConnectionGroup, DatabaseConnection, DatabaseSource, ObjectUtils } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableDatabaseSources = Hash & {
    DatabaseConnections?: ConnectionGroup<DatabaseConnection>[];
    DatabaseSources?: DatabaseSource[];
};

type DatabaseSourcesProps = NullableDatabaseSources
    & typeof ActionCreators
    & RouteComponentProps<{}>;

type DatabaseSourcesState = {
    EditingSource: DatabaseSource;
};

@connect<NullableDatabaseSources, {}, DatabaseSourcesProps>(mapStateToProps, mapDispatchToProps)
export default class DatabaseSources extends React.Component<DatabaseSourcesProps, DatabaseSourcesState> {
    /*
     *  Constructors
     */
    public constructor(props: DatabaseSourcesProps, state: DatabaseSourcesState) {
        super(props);

        this.state = {
            EditingSource: null
        };
    }


    /*
     *  Methods
     */
    private handleAddSourceClick(): void {
        this.handleOpenEditSourceClick(new DatabaseSource());
    }

    private handleToggleSourceIsActiveClick(source: DatabaseSource, isActive: boolean): void {
        source.IsActive = isActive;
        this.props.addOrUpdateDatabaseSource(source);
    }

    private handleRemoveSourceClick(source: DatabaseSource): void {
        this.props.removeDatabaseSource(source);
    }

    private handleOpenEditSourceClick(source: DatabaseSource): void {
        this.setState((prevState: Readonly<DatabaseSourcesState>) => {
            return Object.assign({}, prevState, { EditingSource: source.clone() });
        });
    }

    private handleEditSourceNameChange(name: string): void {
        const editingSource: DatabaseSource = this.state.EditingSource;
        editingSource.Name = name;
        this.setState((prevState: Readonly<DatabaseSourcesState>) => {
            return Object.assign({}, prevState, { EditingSource: editingSource });
        });
    }

    private handleCloseEditSourceClick(save: boolean): void {
        if (save) {
            /*
             *  IF (current editing source's Active Connection Group does not exist
             *      AND project's Database Connections are not null
             *      AND project's Database Connection list contains at least 1 entry)
             * 
             *      OR (current editing source's Active Connection Group is not a valid
             *          group in the project's Database Connection's list)
             * 
             *  THEN (set current editing source's Active Connection Group to the first
             *        group we find in the project's Database Connection list)
             */
            if ((!ObjectUtils.hasObjectValue(this.state.EditingSource.ActiveConnectionGroup)
                && ObjectUtils.isArray(this.props.DatabaseConnections)
                && this.props.DatabaseConnections.length > 0)
                || this.props.DatabaseConnections.filter(d => d.ID === this.state.EditingSource.ActiveConnectionGroup.ID).length === 0) {
                this.state.EditingSource.ActiveConnectionGroup = this.props.DatabaseConnections[0];
            }

            this.props.addOrUpdateDatabaseSource(this.state.EditingSource);
        }

        this.setState((prevState: Readonly<DatabaseSourcesState>) => {
            return Object.assign({}, prevState, { EditingSource: null });
        });
    }

    public render(): JSX.Element {
        return (
            <Cell className='h-100'>
                <Grid className='w-100 h-100 p-3'>
                    <NavViewContentHeaderRow iconClassName='mif-database' title='Database Sources' />

                    <table className='table striped table-border mt-4'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active Connection</th>
                                <th>Active?</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className='button' onClick={this.handleAddSourceClick.bind(this)}>
                                        <span className='mif-add'></span>
                                    </button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.DatabaseSources.map((source: DatabaseSource, i: number, array: DatabaseSource[]) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/sources/db/${i}`}>
                                                <span>{source.Name}</span>
                                            </Link>
                                        </td>
                                        <td>
                                            {
                                                ObjectUtils.hasObjectValue(source.ActiveConnectionGroup)
                                                    ? source.ActiveConnectionGroup.Name
                                                    : ''
                                            }
                                        </td>
                                        <td>
                                            <Switch
                                                checked={source.IsActive}
                                                onStateChanged={(isActive: boolean) => this.handleToggleSourceIsActiveClick(source, isActive)}
                                            />
                                        </td>
                                        <td>
                                            <a href='#'>
                                                <button className='button'
                                                    onClick={() => this.handleOpenEditSourceClick(source)}>
                                                    <span className='mif-pencil'></span>
                                                </button>
                                                <button className='button ml-2' onClick={this.props.swapProjectItemSourceOrder.bind(null, array, i, 'down')} {...ButtonHelpers.swapBtnProps(array, i, 'down')}>
                                                    <span className='mif-arrow-down'></span>
                                                </button>
                                                <button className='button ml-2' onClick={this.props.swapProjectItemSourceOrder.bind(null, array, i, 'up')} {...ButtonHelpers.swapBtnProps(array, i, 'up')}>
                                                    <span className='mif-arrow-up'></span>
                                                </button>
                                                <button className='button ml-2' onClick={this.handleRemoveSourceClick.bind(this, source)}>
                                                    <span className='mif-bin'></span>
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
                    ObjectUtils.hasValue(this.state.EditingSource)
                        ? (
                            <Dialog>
                                <DialogTitle>Edit Database Source</DialogTitle>
                                <DialogContent>
                                    <Row className='mb-2 mt-2'>
                                        <Cell>
                                            <label>Source Name</label>
                                        </Cell>
                                    </Row>

                                    <Row className='mb-2 mt-2'>
                                        <Cell>
                                            <input type='text'
                                                data-role='input'
                                                data-role-input='true'
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditSourceNameChange(ev.target.value)}
                                                value={this.state.EditingSource.Name}
                                            />
                                        </Cell>
                                    </Row>
                                </DialogContent>
                                <DialogAction>
                                    <button className='button' onClick={this.handleCloseEditSourceClick.bind(this, false)}>Cancel</button>
                                    <button className='button' onClick={this.handleCloseEditSourceClick.bind(this, true)}>Save</button>
                                </DialogAction>
                            </Dialog>
                        )
                        : null
                }
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron): NullableDatabaseSources {
    const _hash: string = hash(state.PackageSettings.DatabaseSources);
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        DatabaseSources: state.PackageSettings.DatabaseSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}