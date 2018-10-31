﻿import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Dialog, DialogAction, DialogContent, DialogTitle, Grid, Row, Switch } from "./metro";
import { connect } from "../connect";
import { IEnvironment, Environment, Utilities } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableEnvironments = Hash & {
    Environments?: IEnvironment[];
};

type EnvironmentsProps = NullableEnvironments
    & typeof ActionCreators
    & RouteComponentProps<{}>;

type EnvironmentsState = {
    EditingEnvironment: IEnvironment;
};

@connect<NullableEnvironments, {}, EnvironmentsProps>(mapStateToProps, mapDispatchToProps)
export default class Environments extends React.Component<EnvironmentsProps, EnvironmentsState> {
    /*
     *  Constructors
     */
    public constructor(props: EnvironmentsProps, state: EnvironmentsState) {
        super(props);
        this.state = {
            EditingEnvironment: null
        };
    }


    /*
     *  Methods
     */
    private handleAddEnvironmentClick(): void {
        this.handleOpenEditEnvironmentClick(new Environment());
    }

    private handleToggleEnvironmentIsActiveClick(environment: IEnvironment, isActive: boolean): void {
        environment.IsActive = isActive;
        this.props.toggleActiveEnvironment(environment);
    }

    private handleRemoveEnvironmentClick(Environment: IEnvironment): void {
        this.props.removeEnvironment(Environment);
    }

    private handleOpenEditEnvironmentClick(environment: IEnvironment): void {
        this.setState({
            EditingEnvironment: environment.clone()
        });
    }

    private handleEditEnvironmentNameChange(name: string): void {
        const editingEnvironment: IEnvironment = this.state.EditingEnvironment;
        editingEnvironment.Name = name;
        this.setState({
            EditingEnvironment: editingEnvironment
        });
    }

    private handleCloseEditEnvironmentClick(save: boolean): void {
        if (save) {
            this.props.addOrUpdateEnvironment(this.state.EditingEnvironment);
        }

        this.setState({
            EditingEnvironment: null
        });
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-earth" title="Environments" />
                    
                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active?</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddEnvironmentClick.bind(this)}>
                                        <span className="mif-add"></span>
                                    </button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.Environments.map((environment: IEnvironment, i: number) =>
                                    <tr key={i}>
                                        <td>
                                            <button className="button"
                                                onClick={() => this.handleOpenEditEnvironmentClick(environment)}>
                                                <span className="mif-pencil"></span>
                                            </button>
                                            <span> {environment.Name}</span>
                                        </td>
                                        <td>
                                            <Switch
                                                checked={environment.IsActive}
                                                onStateChanged={(isActive: boolean) => this.handleToggleEnvironmentIsActiveClick(environment, isActive)}
                                            />
                                        </td>
                                        <td>
                                            <button className="button" onClick={this.handleRemoveEnvironmentClick.bind(this, environment)}>
                                                <span className="mif-bin"></span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Grid>

                {
                    Utilities.hasValue(this.state.EditingEnvironment)
                        ? (
                            <Dialog>
                                <DialogTitle>Edit Environment</DialogTitle>
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
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditEnvironmentNameChange(ev.target.value)}
                                                value={this.state.EditingEnvironment.Name}
                                            />
                                        </Cell>
                                    </Row>
                                </DialogContent>
                                <DialogAction>
                                    <button className="button" onClick={this.handleCloseEditEnvironmentClick.bind(this, false)}>Cancel</button>
                                    <button className="button" onClick={this.handleCloseEditEnvironmentClick.bind(this, true)}>Save</button>
                                </DialogAction>
                            </Dialog>
                        )
                        : null
                }
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState): NullableEnvironments {
    const _hash: string = hash(state.PackageSettings.Environments);
    return {
        Environments: state.PackageSettings.Environments,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}