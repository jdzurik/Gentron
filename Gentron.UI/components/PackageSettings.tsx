import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { Hash, PrimitiveProperties } from "../../Gentron.Library/types";
import { IGentron, PackageSettings as LibPackageSettings } from "../../Gentron.Library";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedIPackageSettings = Hash & PrimitiveProperties<LibPackageSettings>

type PackageSettingsProps = HashedIPackageSettings
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<HashedIPackageSettings, {}, PackageSettingsProps>(mapStateToProps, mapDispatchToProps)
export default class PackageSettings extends React.Component<PackageSettingsProps> {
    /*
     *  Constructors
     */
    public constructor(props: PackageSettingsProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleEditorMount(editor: any, monaco: any): void {
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-gift" title="Package Settings" />

                    <Row className="mb-2">
                        <label className="cell-3 text-right">
                            Package Name
                        </label>

                        <Cell colSpan={9}>
                            <div className="input">
                                <input type={`text`}
                                    placeholder={`Package Name`}
                                    value={this.props.PackageName}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdatePackageName(ev.target.value || ``)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />
                                <div className="button-group">
                                    <button className="button input-clear-button"
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdatePackageName.bind(this, null)}>
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

                    <Row className="h-100 mt-2">
                        <Cell>
                            <div className="h-100 w-100 border bd-grayWhite border-size-2">
                                <MonacoEditor
                                    language="markdown"
                                    value={this.props.ReadMe}
                                    options={{ wordWrap: `on` }}
                                    onChange={(value: string) => this.props.addOrUpdateReadMeText(value)}
                                />
                            </div>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

// Wire up the React component to the Redux store
function mapStateToProps(state: IGentron): HashedIPackageSettings {
    const _hash: string = hash(state.PackageSettings);

    return {
        PackageName: state.PackageSettings.PackageName,
        ReadMe: state.PackageSettings.ReadMe,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}