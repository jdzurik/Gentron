import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from "redux";
import { Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, Utilities, Gentron } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableDebugProps = Hash & {
    Gentron?: IGentron;
}

type DebugProps = NullableDebugProps
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{}>;

@connect<NullableDebugProps, {}, DebugProps>(mapStateToProps, mapDispatchToProps)
export default class Debug extends React.Component<DebugProps> {
    /*
     *  Constructors
     */
    public constructor(props: DebugProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        const stateObj: IGentron = {
            ActiveProjectPath: this.props.Gentron.ActiveProjectPath,
            PackageSettings: this.props.Gentron.PackageSettings,
            ProjectSettings: this.props.Gentron.ProjectSettings
        };

        const state: Gentron = Utilities.JSON.deserialize(stateObj, Gentron);

        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-database" title="Debug" />

                    <Row className="h-100 w-100">
                        <Cell>
                            <pre className="h-100 w-100">
                                {
                                    JSON.stringify(Utilities.JSON.serialize(state), null, 4)
                                }
                            </pre>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron): NullableDebugProps {
    const _hash: string = hash(state);
    return {
        Gentron: state,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}