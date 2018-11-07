import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, Grid, Row, Switch } from "./metro";
import { Hash } from "../../Gentron.Library/types";
import { connect } from "../connect";
import { IGentron, HttpSource, IHttpSource, Utilities } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableHttpSources = Hash & {
    HttpSources?: IHttpSource[];
};

type HttpSourcesProps = NullableHttpSources
    & typeof ActionCreators
    & RouteComponentProps<{}>;

type HttpSourcesState = {
    EditingSource: IHttpSource;
};

@connect<NullableHttpSources, {}, HttpSourcesProps>(mapStateToProps, mapDispatchToProps)
export default class HttpSources extends React.Component<HttpSourcesProps, HttpSourcesState> {
    /*
     *  Constructors
     */
    public constructor(props: HttpSourcesProps, state: HttpSourcesState) {
        super(props);

        this.state = {
            EditingSource: null
        };
    }


    /*
     *  Methods
     */
    private handleAddSourceClick(): void {
        this.handleOpenEditSourceClick(new HttpSource());
    }

    private handleToggleSourceIsActiveClick(source: IHttpSource, isActive: boolean): void {
        source.IsActive = isActive;
        this.props.addOrUpdateHttpSource(source);
    }

    private handleRemoveSourceClick(source: IHttpSource): void {
        this.props.removeHttpSource(source);
    }

    private handleOpenEditSourceClick(source: IHttpSource): void {
        this.setState((prevState: Readonly<HttpSourcesState>) => {
            return Object.assign({}, prevState, { EditingSource: source.clone() });
        });
    }

    private handleEditSourceNameChange(name: string): void {
        const editingSource: IHttpSource = this.state.EditingSource;
        editingSource.Name = name;
        this.setState((prevState: Readonly<HttpSourcesState>) => {
            return Object.assign({}, prevState, { EditingSource: editingSource });
        });
    }

    private handleCloseEditSourceClick(save: boolean): void {
        if (save) {
            this.props.addOrUpdateHttpSource(this.state.EditingSource);
        }

        this.setState((prevState: Readonly<HttpSourcesState>) => {
            return Object.assign({}, prevState, { EditingSource: null });
        });
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-http" title="HTTP Sources" />

                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active?</th>
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
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.HttpSources.map((source, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/sources/http/${i}`}>
                                                <button className="button">
                                                    <span className="mif-enter"></span>
                                                </button>
                                            </Link>
                                            <button className="button ml-2"
                                                onClick={() => this.handleOpenEditSourceClick(source)}>
                                                <span className="mif-pencil"></span>
                                            </button>
                                            <span> {source.Name}</span>
                                        </td>
                                        <td>
                                            <Switch
                                                checked={source.IsActive}
                                                onStateChanged={(isActive: boolean) => this.handleToggleSourceIsActiveClick(source, isActive)}
                                            />
                                        </td>
                                        <td>
                                            <a href="#">
                                                <button className="button" onClick={this.handleRemoveSourceClick.bind(this, source)}>
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
                                <DialogTitle>Edit HTTP Source</DialogTitle>
                                <DialogContent>
                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <label>Source Name</label>
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

function mapStateToProps(state: IGentron): NullableHttpSources {
    const _hash: string = hash(state.PackageSettings.HttpSources);
    return {
        HttpSources: state.PackageSettings.HttpSources,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}