import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { ITemplate } from "../../Gentron.Library";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";
import SplitPane from "./SplitPane";

type HashedTemplate = Hash & {
    Template?: NonFunctionProperties<ITemplate>;
};

type TemplateProps = HashedTemplate
    & typeof ActionCreators
    & RouteComponentProps<{ engineid: string, templateid: string }>;

@connect<HashedTemplate, {}, TemplateProps>(mapStateToProps, mapDispatchToProps)
export default class Template extends React.Component<TemplateProps> {
    /*
     *  Constructors
     */
    public constructor(props: TemplateProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-embed2" title={this.props.Template.Name} />

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton
                                buttonText="View All Engine Templates"
                                iconClassName="mif-arrow-left"
                                linkTo={`/engines/manage/${this.props.match.params.engineid}`}
                            />
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
                                language="javascript"
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

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ engineid: string, templateid: string }>): HashedTemplate {
    const engineid: string = routeComponentProps.match.params.engineid;
    const templateid: string = routeComponentProps.match.params.templateid;
    const _hash: string = hash(state.PackageSettings.Engines[engineid].Templates[templateid] || "")
    return {
        Template: state.PackageSettings.Engines[engineid].Templates[templateid],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}