import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { Template, ITemplate } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableTemplates = Hash & {
    Templates?: NonFunctionProperties<ITemplate>[];
};

type TemplatesProps = NullableTemplates
    & typeof ActionCreators
    & RouteComponentProps<{ engineid: string }>;

@connect<NullableTemplates, {}, TemplatesProps>(mapStateToProps, mapDispatchToProps)
export default class Templates extends React.Component<TemplatesProps> {
    /*
     *  Constructors
     */
    public constructor(props: TemplatesProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleAddTemplateClick(): void {
        const source: ITemplate = new Template();
        source.Name = `Template${this.props.Templates.length}`;

        this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, source);
    }

    private handleRemoveTemplateClick(source: ITemplate): void {
        this.props.removeEngineTemplate(this.props.match.params.engineid, source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-embed2" title="Engine Templates" />

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton iconClassName="mif-arrow-left" linkTo={`/engines/manage/${this.props.match.params.engineid}`} buttonText="View Template Engine"></LinkButton>
                        </Cell>
                    </Row>

                    <table className="table striped table-border mt-4">
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
                                    <button className="button" onClick={this.handleAddTemplateClick.bind(this)}>Add Template</button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.Templates.map((source, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/engines/manage/${this.props.match.params.engineid}/templates/${i}`}>
                                                <button className="button">
                                                    View
                                                </button>
                                            </Link>
                                        </td>
                                        <td>{source.Name}</td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveTemplateClick.bind(this, source)}>Remove</button>
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

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ engineid: string }>): NullableTemplates {
    const engineid: string = routeComponentProps.match.params.engineid;
    const _hash: string = hash(state.PackageSettings.Engines[engineid].Templates);
    return {
        Templates: state.PackageSettings.Engines[engineid].Templates,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}