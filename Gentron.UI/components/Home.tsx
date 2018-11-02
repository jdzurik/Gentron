import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
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
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-database" title="Home" />

                    <pre>
                        {
                            JSON.stringify(
                                {
                                    ID: this.props.Gentron.ID,
                                    PackageSettings: this.props.Gentron.PackageSettings.toJson(),
                                    ProjectSettings: this.props.Gentron.ProjectSettings.toJson()
                                },
                                null,
                                4
                            )
                        }
                    </pre>
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