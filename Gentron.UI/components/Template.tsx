import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { ITemplate } from "../../Gentron.Library";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import { SplitPane } from "./splitpane";

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
    private handleNameClick(source: ITemplate): void {
        source.Name = "Test";
        this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <Row>
                        <Cell colSpan={12}>
                            <h3>
                                <span className="mif-embed2 mif-md mr-2"></span>
                                <span onClick={this.handleNameClick.bind(this, this.props.Template)}>{this.props.Template.Name}</span>
                            </h3>
                        </Cell>
                    </Row>

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton iconClassName="mif-arrow-left" linkTo={`/engines/manage/${this.props.match.params.engineid}`} buttonText="View All Templates"></LinkButton>
                        </Cell>
                    </Row>

                    <SplitPane splitPaneProps={{ split:`vertical`, size: `calc(50% - 15px)`}}>
                        <div>Pane 1</div>
                        <div>Pane 2</div>
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