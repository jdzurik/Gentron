import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from 'redux';
import { Hash, PrimitiveProperties } from "../../Gentron.Library/types";
import { Cell, FolderInput, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IGentron, ProjectSettings as LibProjectSettings } from "../../Gentron.Library";
import { RouteComponentProps } from "react-router";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedIProjectSettings = Hash & PrimitiveProperties<LibProjectSettings>

type ProjectSettingsProps = HashedIProjectSettings
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<HashedIProjectSettings, {}, ProjectSettingsProps>(mapStateToProps, mapDispatchToProps)
export default class ProjectSettings extends React.Component<ProjectSettingsProps> {
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
                            <FolderInput
                                onFolderPathChange={(value: string) => this.props.addOrUpdateLocalPackageFolder(value)}
                                placeholder="Local Package Folder"
                                value={this.props.LocalPackageFolder}
                            />
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
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdateRemotePackageLocation(ev.target.value || ``)}
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

function mapStateToProps(state: IGentron): HashedIProjectSettings {
    const _hash: string = hash(state.ProjectSettings);
    return {
        LocalPackageFolder: state.ProjectSettings.LocalPackageFolder,
        RemotePackageLocation: state.ProjectSettings.RemotePackageLocation,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}