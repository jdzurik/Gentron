import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, HttpSource as LibHttpSource } from "../../Gentron.Library";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";
import SplitPane from "./SplitPane";

type HashedHttpSource = Hash & {
    HttpSource?: LibHttpSource
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
    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-http" title={this.props.HttpSource.Name} />

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton iconClassName="mif-arrow-left" linkTo="/sources/http" buttonText="View All Sources"></LinkButton>
                        </Cell>
                    </Row>

                    <SplitPane splitPaneProps={{ split: `vertical`, size: `calc(50% - 15px)` }}>
                        <div className="h-100 w-100">
                            <MonacoEditor
                                language="javascript"
                                value={(() => { }).toString()}
                                options={{readOnly: true, wordWrap: `on`}}
                                onChange={console.log}
                                editorDidMount={() => {}}
                            />
                        </div>
                        <div className="h-100 w-100">
                            <MonacoEditor
                                language="json"
                                value={(() => { }).toString()}
                                options={{ readOnly: true, wordWrap: `on` }}
                                onChange={console.log}
                                editorDidMount={() => {}}
                            />
                        </div>
                    </SplitPane>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ id: string }>): HashedHttpSource {
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