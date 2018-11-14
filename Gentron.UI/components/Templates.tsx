import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, LinkButton, Grid, Row } from "./metro";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, Template, Utilities } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableTemplates = Hash & {
    Templates?: Template[];
};

type TemplatesProps = NullableTemplates
    & typeof ActionCreators
    & RouteComponentProps<{ engineid: string }>;

type TemplatesState = {
    EditingSource: Template;
};

@connect<NullableTemplates, {}, TemplatesProps>(mapStateToProps, mapDispatchToProps)
export default class Templates extends React.Component<TemplatesProps, TemplatesState> {
    /*
     *  Constructors
     */
    public constructor(props: TemplatesProps, state: TemplatesState) {
        super(props);

        this.state = {
            EditingSource: null
        }
    }


    /*
     *  Methods
     */
    private handleAddSourceClick(): void {
        this.handleOpenEditSourceClick(new Template());
    }

    private handleRemoveSourceClick(source: Template): void {
        this.props.removeEngineTemplate(this.props.match.params.engineid, source);
    }

    private handleOpenEditSourceClick(source: Template): void {
        this.setState((prevState: Readonly<TemplatesState>) => {
            return Object.assign({}, prevState, { EditingSource: source.clone() });
        });
    }

    private handleEditSourceNameChange(name: string): void {
        const editingSource: Template = this.state.EditingSource;
        editingSource.Name = name;
        this.setState((prevState: Readonly<TemplatesState>) => {
            return Object.assign({}, prevState, { EditingSource: editingSource });
        });
    }

    private handleCloseEditSourceClick(save: boolean): void {
        if (save) {
            this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, this.state.EditingSource);
        }

        this.setState((prevState: Readonly<TemplatesState>) => {
            return Object.assign({}, prevState, { EditingSource: null });
        });
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
                                <th>Name</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddSourceClick.bind(this)}>
                                        <span className="mif-add"></span>
                                    </button>
                                </td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.Templates.map((source: Template, i: number) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/engines/manage/${this.props.match.params.engineid}/templates/${i}`}>
                                                <span>{source.Name}</span>
                                            </Link>
                                        </td>
                                        <td>
                                            <a href="#">
                                                <button className="button"
                                                    onClick={() => this.handleOpenEditSourceClick(source)}>
                                                    <span className="mif-pencil"></span>
                                                </button>
                                                <button className="button ml-2" onClick={this.handleRemoveSourceClick.bind(this, source)}>
                                                    <span className="mif-bin"></span>
                                                </button>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Grid>

                {
                    Utilities.hasValue(this.state.EditingSource)
                        ? (
                            <Dialog>
                                <DialogTitle>Edit Engine Template</DialogTitle>
                                <DialogContent>
                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <label>Template Name</label>
                                        </Cell>
                                    </Row>

                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <input type="text"
                                                data-role="input"
                                                data-role-input="true"
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditSourceNameChange(ev.target.value)}
                                                value={this.state.EditingSource.Name}
                                            />
                                        </Cell>
                                    </Row>
                                </DialogContent>
                                <DialogAction>
                                    <button className="button" onClick={this.handleCloseEditSourceClick.bind(this, false)}>Cancel</button>
                                    <button className="button" onClick={this.handleCloseEditSourceClick.bind(this, true)}>Save</button>
                                </DialogAction>
                            </Dialog>
                        )
                        : null
                }
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ engineid: string }>): NullableTemplates {
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