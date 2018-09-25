import * as React from "react";
import * as ReactDOM from "react-dom";
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { RouteComponentProps } from "react-router";
import { connect } from 'react-redux';
import { Cell, Grid, Row } from "./metro";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";
import { ApplicationState } from "../actions";
import { ActionCreators } from "../actions/ProjectSettings";
import { ProjectSettingsState } from "../../Gentron.Library";

type ProjectSettingsProps = ProjectSettingsState
    & typeof ActionCreators
    & RouteComponentProps<{}>
    & { fileInput1: React.Ref<HTMLInputElement>; fileInput2: React.Ref<HTMLInputElement>};

class ProjectSettings extends React.Component<ProjectSettingsProps, {}> {
    public constructor(props: ProjectSettingsProps) {
        super(props);
    }

    public componentDidMount(): void {
        //console.log("mounted");
        //console.log(this.props);
    }

    public render(): JSX.Element {
        return (
            <Cell className={`h-100`}>
                <Grid className={`w-100 h-100 p-3`}>
                    <NavViewContentHeaderRow iconClassName={`mif-drive2`} title={`Project Settings`} />

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Local Package Folder
                        </label>

                        <Cell colSpan={9}>
                            <div className={`input`}>
                                <input type={`text`}
                                    placeholder={`Local Package Folder`}
                                    value={this.props.LocalPackageFolder}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdateLocalPackageFolder(ev)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />
                                <div className={`button-group`}>
                                    <button className={`button input-clear-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdateLocalPackageFolder.bind(this, null)}>
                                        <span className={`default-icon-cross`}></span>
                                    </button>
                                    <button className={`button input-custom-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={console.log}>
                                        <span className={`mif-folder-open`}></span>
                                    </button>
                                </div>
                            </div>
                        </Cell>
                    </Row>

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Remote Package Location
                        </label>

                        <Cell colSpan={9}>
                            <div className={`input`}>
                                <input type={`text`}
                                    placeholder={`Remote Package Location`}
                                    value={this.props.RemotePackageLocation}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdateRemotePackageLocation(ev)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />
                                <div className={`button-group`}>
                                    <button className={`button input-clear-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdateRemotePackageLocation.bind(this, null)}>
                                        <span className={`default-icon-cross`}></span>
                                    </button>
                                    <button className={`button input-custom-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={console.log}>
                                        <span className={`mif-folder-open`}></span>
                                    </button>
                                </div>
                            </div>
                        </Cell>
                    </Row>

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Output Code Folder
                        </label>

                        <Cell colSpan={9}>
                            <div className={`input`}>
                                <input type={`text`}
                                    placeholder={`Output Code Folder`}
                                    value={this.props.OutputCodeFolder}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdateOutputCodeFolder(ev)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />

                                <div className={`button-group`}>
                                    <button className={`button input-clear-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdateOutputCodeFolder.bind(this, null)}>
                                        <span className={`default-icon-cross`}></span>
                                    </button>
                                    <button className={`button input-custom-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={console.log}>
                                        <span className={`mif-folder-open`}></span>
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

// Wire up the React component to the Redux store
function mapStateToProps(state: ApplicationState): ProjectSettingsState {
    return state.ProjectSettings;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect<ProjectSettingsState, {}, ProjectSettingsProps>(
    mapStateToProps,
    mapDispatchToProps
)(ProjectSettings) as typeof ProjectSettings;