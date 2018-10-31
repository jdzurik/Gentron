import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { IEngine } from "../../Gentron.Library";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedEngine = Hash & {
    Engine?: NonFunctionProperties<IEngine>;
};

type EngineProps = HashedEngine
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedEngine, {}, EngineProps>(mapStateToProps, mapDispatchToProps)
export default class Engine extends React.Component<EngineProps> {
    /*
     *  Constructors
     */
    public constructor(props: EngineProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-drive-eta" title={this.props.Engine.Name} />

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton iconClassName="mif-arrow-left"
                                linkTo="/engines/manage"
                                buttonText="View All Engines"
                            />
                            <LinkButton iconClassName="mif-arrow-right"
                                iconPosition="forward"
                                linkTo={`/engines/manage/${this.props.match.params.id}/templates`}
                                buttonText="Manage Templates"
                                buttonClassName="ml-2"
                            />
                        </Cell>
                    </Row>

                    <Row className="h-100 mt-2">
                        <Cell>
                            <div className="h-100 w-100 border bd-grayWhite border-size-2">
                                <MonacoEditor
                                    language="javascript"
                                    value={(() => { }).toString()}
                                    options={{ wordWrap: `on` }}
                                    onChange={console.log}
                                    editorDidMount={() => {}}
                                />
                            </div>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ id: string }>): HashedEngine {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.Engines[id] || "")
    return {
        Engine: state.PackageSettings.Engines[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}