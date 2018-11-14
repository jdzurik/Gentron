import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { ButtonHelpers } from "../helpers";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, Grid, Row } from "./metro";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, Engine, Utilities } from "../../Gentron.Library";
import { Link, RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableEngines = Hash & {
    Engines?: Engine[];
};

type EnginesProps = NullableEngines
    & typeof ActionCreators
    & RouteComponentProps<{}>;

type EnginesState = {
    EditingSource: Engine;
};

@connect<NullableEngines, {}, EnginesProps>(mapStateToProps, mapDispatchToProps)
export default class Engines extends React.Component<EnginesProps, EnginesState> {
    /*
     *  Constructors
     */
    public constructor(props: EnginesProps, state: EnginesState) {
        super(props);

        this.state = {
            EditingSource: null
        };
    }


    /*
     *  Methods
     */
    private handleAddSourceClick(): void {
        this.handleOpenEditSourceClick(new Engine());
    }

    private handleRemoveSourceClick(source: Engine): void {
        this.props.removeEngine(source);
    }

    private handleOpenEditSourceClick(source: Engine): void {
        this.setState((prevState: Readonly<EnginesState>) => {
            return Object.assign({}, prevState, { EditingSource: source.clone() });
        });
    }

    private handleEditSourceNameChange(name: string): void {
        const editingSource: Engine = this.state.EditingSource;
        editingSource.Name = name;
        this.setState((prevState: Readonly<EnginesState>) => {
            return Object.assign({}, prevState, { EditingSource: editingSource });
        });
    }

    private handleCloseEditSourceClick(save: boolean): void {
        if (save) {
            this.props.addOrUpdateEngine(this.state.EditingSource);
        }

        this.setState((prevState: Readonly<EnginesState>) => {
            return Object.assign({}, prevState, { EditingSource: null });
        });
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-drive-eta" title="Template Engines" />

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
                                this.props.Engines.map((source: Engine, i: number, array: Engine[]) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`/engines/manage/${i}`}>
                                                <span>{source.Name}</span>
                                            </Link>
                                        </td>
                                        <td>
                                            <a href="#">
                                                <button className="button"
                                                    onClick={() => this.handleOpenEditSourceClick(source)}>
                                                    <span className="mif-pencil"></span>
                                                </button>
                                                <button className="button ml-2" onClick={this.props.swapProjectItemSourceOrder.bind(null, array, i, `down`)} {...ButtonHelpers.swapBtnProps(array, i, `down`)}>
                                                    <span className="mif-arrow-down"></span>
                                                </button>
                                                <button className="button ml-2" onClick={this.props.swapProjectItemSourceOrder.bind(null, array, i, `up`)} {...ButtonHelpers.swapBtnProps(array, i, `up`)}>
                                                    <span className="mif-arrow-up"></span>
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
                                <DialogTitle>Edit Template Engine</DialogTitle>
                                <DialogContent>
                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <label>Engine Name</label>
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

function mapStateToProps(state: IGentron): NullableEngines {
    const _hash: string = hash(state.PackageSettings.Engines);
    return {
        Engines: state.PackageSettings.Engines,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}