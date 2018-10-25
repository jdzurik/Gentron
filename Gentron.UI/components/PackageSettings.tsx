import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IPackageSettings } from "../../Gentron.Library";
import { RouteComponentProps } from "react-router";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedIPackageSettings = Hash & NonFunctionProperties<IPackageSettings>

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
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdatePackageName(ev)}
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
                </Grid>
            </Cell>
        );
    }
}

// Wire up the React component to the Redux store
function mapStateToProps(state: ApplicationState): HashedIPackageSettings {
    const _hash: string = hash(state.PackageSettings);

    return {
        DatabaseSources: state.PackageSettings.DatabaseSources,
        Engines: state.PackageSettings.Engines,
        FileSources: state.PackageSettings.FileSources,
        HttpSources: state.PackageSettings.HttpSources,
        PackageName: state.PackageSettings.PackageName,
        ReadMeText: state.PackageSettings.ReadMeText,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}