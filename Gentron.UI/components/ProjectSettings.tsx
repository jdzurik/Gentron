import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/ProjectSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from 'redux';
import { Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IProjectSettings } from "../../Gentron.Library";
import { RouteComponentProps } from "react-router";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedIProjectSettings = Hash & NonFunctionProperties<IProjectSettings>

type ProjectSettingsProps = HashedIProjectSettings
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<HashedIProjectSettings, {}, ProjectSettingsProps>(mapStateToProps, mapDispatchToProps)
export default class ProjectSettings extends React.Component<ProjectSettingsProps, {}> {
    /*
     *  Constructors
     */
    public constructor(props: ProjectSettingsProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-drive2" title="Project Settings" />

                    <Row className="mb-2">
                        <label className="cell-3 text-right">
                            Local Package Folder
                        </label>

                        <Cell colSpan={9}>
                            <div className="input">
                                <input type={`text`}
                                    placeholder={`Local Package Folder`}
                                    value={this.props.LocalPackageFolder}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdateLocalPackageFolder(ev)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />
                                <div className="button-group">
                                    <button className="button input-clear-button"
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdateLocalPackageFolder.bind(this, null)}>
                                        <span className="default-icon-cross"></span>
                                    </button>
                                    <button className="button input-custom-button"
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={console.log}>
                                        <span className="mif-folder-open"></span>
                                    </button>
                                </div>
                            </div>
                        </Cell>
                    </Row>

                    <Row className="mb-2">
                        <label className="cell-3 text-right">
                            Remote Package Location
                        </label>

                        <Cell colSpan={9}>
                            <div className="input">
                                <input type={`text`}
                                    placeholder={`Remote Package Location`}
                                    value={this.props.RemotePackageLocation}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdateRemotePackageLocation(ev)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />
                                <div className="button-group">
                                    <button className="button input-clear-button"
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdateRemotePackageLocation.bind(this, null)}>
                                        <span className="default-icon-cross"></span>
                                    </button>
                                    <button className="button input-custom-button"
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={console.log}>
                                        <span className="mif-folder-open"></span>
                                    </button>
                                </div>
                            </div>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>            
        );
    }
}

function mapStateToProps(state: ApplicationState): HashedIProjectSettings {
    const _hash: string = hash(state.ProjectSettings);
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        FileConnections: state.ProjectSettings.FileConnections,
        HttpConnections: state.ProjectSettings.HttpConnections,
        LocalPackageFolder: state.ProjectSettings.LocalPackageFolder,
        OutputPaths: state.ProjectSettings.OutputPaths,
        RemotePackageLocation: state.ProjectSettings.RemotePackageLocation,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}