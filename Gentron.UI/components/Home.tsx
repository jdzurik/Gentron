import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { ApplicationState, Hash } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableHomeProps = Hash & {
    Gentron?: ApplicationState;
}

type HomeProps = NullableHomeProps
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{}>;

@connect<NullableHomeProps, {}, HomeProps>(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component<HomeProps> {
    /*
     *  Constructors
     */
    public constructor(props: HomeProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-database" title="Home" />

                    <pre>
                        {JSON.stringify(this.props.Gentron, null, 4)}
                    </pre>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState): NullableHomeProps {
    const _hash: string = hash(state);
    return {
        Gentron: state,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}