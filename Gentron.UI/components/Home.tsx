import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, Utilities, Gentron } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import JSONTree from "react-json-tree";
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableHomeProps = Hash & {
    Gentron?: IGentron;
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
        console.log(this.props.Gentron);
        const state: IGentron = Utilities.JSON.deserialize(this.props.Gentron, Gentron);
        console.log(state);
        const taJson: string = (Utilities.JSON.stringify as any)({ ID: state.ID, PackageSettings: state.PackageSettings, ProjectSettings: state.ProjectSettings }, null, 4);
        console.log(taJson);

        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-database" title="Home" />

                    <JSONTree data={{ ID: state.ID, PackageSettings: state.PackageSettings, ProjectSettings: state.ProjectSettings }} />
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron): NullableHomeProps {
    const _hash: string = hash(state);
    return {
        Gentron: state,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}