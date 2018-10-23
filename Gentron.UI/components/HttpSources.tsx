import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid } from "./metro";
import { connect } from "../connect";
import { HttpSource, IHttpSource } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableHttpSources = {
    HttpSources?: NonFunctionProperties<IHttpSource>[];
    _hash?: string;
};

type HttpSourcesProps = NullableHttpSources
    & typeof ActionCreators
    & RouteComponentProps<{}>;

@connect<NullableHttpSources, {}, HttpSourcesProps>(mapStateToProps, mapDispatchToProps)
export default class HttpSources extends React.Component<HttpSourcesProps> {
    public constructor(props: HttpSourcesProps) {
        super(props);
    }

    private handleAddSourceClick(): void {
        const source: IHttpSource = new HttpSource();
        source.Name = `HTTPSource${this.props.HttpSources.length}`;

        this.props.addOrUpdateHttpSource(source);
    }

    private handleRemoveSourceClick(source: IHttpSource): void {
        this.props.removeHttpSource(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className={`h-100`}>
                <Grid className={`w-100 h-100 p-3`}>
                    <NavViewContentHeaderRow iconClassName={`mif-http`} title={`HTTP Sources`} />

                    <table className={`table striped table-border mt-4`}>
                        <thead>
                            <tr>
                                <th>{` `}</th>
                                <th>Name</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className={`button`} onClick={this.handleAddSourceClick.bind(this)}>Add Source</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.HttpSources.map((source, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/sources/http/${i}`}>
                                                <button className="button">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                        <td>{source.Name}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveSourceClick.bind(this, source)}>Remove</button>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState): NullableHttpSources {
    const _hash: string = hash(state.PackageSettings.HttpSources);
    return {
        HttpSources: state.PackageSettings.HttpSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}