import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { Cell, Grid, Row } from "./metro";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";
import { ActionCreators } from "../actions/PackageSettings";
import { IPackageSettings } from "../../Gentron.Library";
import { ApplicationState } from "../actions";

type PackageSettingsProps = IPackageSettings
    & typeof ActionCreators
    & RouteComponentProps<{}>;

class PackageSettings extends React.Component<PackageSettingsProps, {}> {
    public constructor(props: PackageSettingsProps) {
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
                    <NavViewContentHeaderRow iconClassName={`mif-gift`} title={`Package Settings`} />

                    <Row className={`mb-2`}>
                        <label className={`cell-3 text-right`}>
                            Package Name
                        </label>

                        <Cell colSpan={9}>
                            <div className={`input`}>
                                <input type={`text`}
                                    placeholder={`Package Name`}
                                    value={this.props.PackageName}
                                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.props.addOrUpdatePackageName(ev)}
                                    data-role={`input`}
                                    data-role-input={true}
                                />
                                <div className={`button-group`}>
                                    <button className={`button input-clear-button`}
                                        tabIndex={-1}
                                        type={`button`}
                                        onClick={this.props.addOrUpdatePackageName.bind(this, null)}>
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
function mapStateToProps(state: ApplicationState): IPackageSettings {
    return state.PackageSettings;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect<IPackageSettings, {}, PackageSettingsProps>(
    mapStateToProps,
    mapDispatchToProps
)(PackageSettings) as typeof PackageSettings;