import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { ApplicationState, Hash } from "../types";
import { bindActionCreators } from "redux";
import { Cell, Dialog, DialogTitle, DialogContent, DialogAction, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IEnvironment, Utilities, IOutputPathGroup, IOutputPath, OutputPathGroup, OutputPath } from "../../Gentron.Library";
import { RouteComponentProps } from 'react-router-dom'
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type NullableOutputPaths = Hash & {
    OutputPathGroups?: IOutputPathGroup<IOutputPath>[];
    Environments?: IEnvironment[];
};

type OutputPathsProps = NullableOutputPaths
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{}>;

type OutputPathsState = {
    EditingOutputPathGroup: IOutputPathGroup<IOutputPath>;
};

@connect<NullableOutputPaths, {}, OutputPathsProps>(mapStateToProps, mapDispatchToProps)
export default class OutputPaths extends React.Component<OutputPathsProps, OutputPathsState> {
    /*
     *  Constructors
     */
    public constructor(props: OutputPathsProps, state: OutputPathsState) {
        super(props);
        this.state = {
            EditingOutputPathGroup: null
        };
    }


    /*
     *  Methods
     */
    private handleAddOutputPathGroupClick(): void {
        this.handleOpenEditOutputPathGroupClick(new OutputPathGroup<IOutputPath>());
    }

    private handleRemoveOutputPathGroupClick(outputPathGroup: IOutputPathGroup<IOutputPath>): void {
        this.props.removeOutputPathGroup(outputPathGroup);
    }

    private handleOpenEditOutputPathGroupClick(outputPathGroup: IOutputPathGroup<IOutputPath>): void {
        this.setState({
            EditingOutputPathGroup: outputPathGroup.clone()
        });
    }

    private handleEditOutputPathGroupNameChange(name: string): void {
        const editingOutputPathGroup: IOutputPathGroup<IOutputPath> = this.state.EditingOutputPathGroup;
        editingOutputPathGroup.Name = name;
        this.setState({
            EditingOutputPathGroup: editingOutputPathGroup
        });
    }

    private handleEditOutputPathGroupPathChange(environment: IEnvironment, connStr): void {
        const editingOutputPathGroup: IOutputPathGroup<IOutputPath> = this.state.EditingOutputPathGroup;
        editingOutputPathGroup.Paths.forEach((path: IOutputPath, i: number) => {
            if (path.Environment === environment.Name) {
                path.Path = connStr;
            }
        });
        this.setState({
            EditingOutputPathGroup: editingOutputPathGroup
        });
    }

    private handleCloseEditOutputPathGroupClick(save: boolean): void {
        if (save) {
            this.props.addOrUpdateOutputPathGroup(this.state.EditingOutputPathGroup);
        }

        this.setState({
            EditingOutputPathGroup: null
        });
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-folder-open" title="Output Paths" />

                    <table className="table striped table-border mt-4">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Paths</th>
                                <th>{` `}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button className="button" onClick={this.handleAddOutputPathGroupClick.bind(this)}>
                                        <span className="mif-add"></span>
                                    </button>
                                </td>
                                <td>{` `}</td>
                                <td>{` `}</td>
                            </tr>
                            {
                                this.props.OutputPathGroups.map((outputPath: IOutputPathGroup<IOutputPath>, i: number) =>
                                    <tr key={i}>
                                        <td>
                                            <button className="button"
                                                onClick={() => this.handleOpenEditOutputPathGroupClick(outputPath)}>
                                                <span className="mif-pencil"></span>
                                            </button>
                                            <span> {outputPath.Name}</span>
                                        </td>
                                        <td>
                                            {outputPath.Paths.length}
                                        </td>
                                        <td>
                                            <button className="button" onClick={this.handleRemoveOutputPathGroupClick.bind(this, outputPath)}>
                                                <span className="mif-bin"></span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Grid>

                {
                    Utilities.hasValue(this.state.EditingOutputPathGroup)
                        ? (
                            <Dialog>
                                <DialogTitle>Edit Output Path</DialogTitle>
                                <DialogContent>
                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <label>Group Name</label>
                                        </Cell>
                                    </Row>

                                    <Row className="mb-2 mt-2">
                                        <Cell>
                                            <input type="text"
                                                data-role="input"
                                                data-role-input="true"
                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditOutputPathGroupNameChange(ev.target.value)}
                                                value={this.state.EditingOutputPathGroup.Name}
                                            />
                                        </Cell>
                                    </Row>

                                    {
                                        this.props.Environments.map((env: IEnvironment, i: number) => {
                                            let currOutputPath: IOutputPath = this.state.EditingOutputPathGroup.Paths.find(conn => conn.Environment === env.Name);

                                            if (!Utilities.hasValue(currOutputPath)) {
                                                currOutputPath = new OutputPath();
                                                currOutputPath.Environment = env.Name;
                                                this.state.EditingOutputPathGroup.addOrUpdatePath(currOutputPath);
                                            }

                                            return (
                                                <React.Fragment key={i}>
                                                    <Row className="mb-2 mt-2">
                                                        <Cell>
                                                            <label>{env.Name} Output Path</label>
                                                        </Cell>
                                                    </Row>

                                                    <Row className="mb-2 mt-2">
                                                        <Cell>
                                                            <input type="text"
                                                                data-role="input"
                                                                data-role-input="true"
                                                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleEditOutputPathGroupPathChange(env, ev.target.value)}
                                                                value={currOutputPath.Path}
                                                            />
                                                        </Cell>
                                                    </Row>
                                                </React.Fragment>
                                            );
                                        })
                                    }

                                </DialogContent>
                                <DialogAction>
                                    <button className="button" onClick={this.handleCloseEditOutputPathGroupClick.bind(this, false)}>Cancel</button>
                                    <button className="button" onClick={this.handleCloseEditOutputPathGroupClick.bind(this, true)}>Save</button>
                                </DialogAction>
                            </Dialog>
                        )
                        : null
                }
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState): NullableOutputPaths {
    const _outputPathGroupsHash: string = hash(state.ProjectSettings.OutputPathGroups);
    const _envHash: string = hash(state.PackageSettings.Environments);
    const _hash: string = hash(_outputPathGroupsHash + _envHash);
    return {
        OutputPathGroups: state.ProjectSettings.OutputPathGroups,
        Environments: state.PackageSettings.Environments,
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}