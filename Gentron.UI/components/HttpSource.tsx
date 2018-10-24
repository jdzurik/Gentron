﻿import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IHttpSource } from "../../Gentron.Library";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

type HashedHttpSource = Hash & {
    HttpSource?: NonFunctionProperties<IHttpSource>;
};

type HttpSourceProps = HashedHttpSource
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedHttpSource, {}, HttpSourceProps>(mapStateToProps, mapDispatchToProps)
export default class HttpSource extends React.Component<HttpSourceProps> {
    /*
     *  Constructors
     */
    public constructor(props: HttpSourceProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleNameClick(source: IHttpSource): void {
        source.Name = "Test";
        this.props.addOrUpdateHttpSource(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <Row>
                        <Cell colSpan={12}>
                            <h3>
                                <span className="mif-http mif-md mr-2"></span>
                                <span onClick={this.handleNameClick.bind(this, this.props.HttpSource)}>{this.props.HttpSource.Name}</span>
                            </h3>
                        </Cell>
                    </Row>

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <Link to="/sources/http">
                                <button className="button">
                                    Return to All Sources
                                </button>
                            </Link>
                        </Cell>
                    </Row>

                    <h1>{this.props.match.params.id}</h1>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ id: string }>): HashedHttpSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.HttpSources[id] || "")
    return {
        HttpSource: state.PackageSettings.HttpSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}