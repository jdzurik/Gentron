import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid, Switch } from "./metro";
import { connect } from "../connect";
import { IEnvironment, Environment } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";
declare type TMetro = typeof import("metro4");
declare const Metro: TMetro;

type NullableEnvironments = Hash & {
    Environments?: IEnvironment[];
};

type EnvironmentsProps = NullableEnvironments
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableEnvironments, {}, EnvironmentsProps>(mapStateToProps, mapDispatchToProps)
export default class Environments extends React.Component<EnvironmentsProps> {
    /*
     *  Constructors
     */
    public constructor(props: EnvironmentsProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddEnvironmentClick(): void {
        const ouputPath: IEnvironment = new Environment();
        ouputPath.Name = `Environment${this.props.Environments.length}`;
        this.props.addOrUpdateEnvironment(ouputPath);
    }

    private handleToggleEnvironmentIsActiveClick(environment: IEnvironment, isActive: boolean): void {
        environment.IsActive = isActive;
        this.props.toggleActiveEnvironment(environment);
    }

    private handleRemoveEnvironmentClick(Environment: IEnvironment): void {
        this.props.removeEnvironment(Environment);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-folder-open" title="Environments" />
                    
                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>{` `}</th>
                                <th>Name</th>
                                <th>Active?</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddEnvironmentClick.bind(this)}>Add Environment</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.Environments.map((environment, i) =>
                                    <tr key={i}>
                                        <td>{` `}</td>
                                        <td>{environment.Name}</td>
                                        <td>
                                            <Switch
                                                checked={environment.IsActive}
                                                onStateChanged={(isActive: boolean) => this.handleToggleEnvironmentIsActiveClick(environment, isActive)}
                                            />
                                        </td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveEnvironmentClick.bind(this, environment)}>Remove</button>
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