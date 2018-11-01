import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators as PackageSettingsActionCreators } from "../actions/PackageSettings";
import { ActionCreators as ProjectSettingsActionCreators } from "../actions/ProjectSettings";
import { bindActionCreators } from "redux";
import { Hash } from "../../Gentron.Library/types";
import { Cell, FileInput, Grid, LinkButton, Row } from "./metro";
import { connect } from "../connect";
import { IGentron, IConnectionGroup, IDatabaseConnection, IDatabaseSource } from "../../Gentron.Library";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import SplitPane from "./SplitPane";

type IDatabaseSourceProperties = IDatabaseSource;

type DbSource = Hash & {
    DatabaseConnections?: IConnectionGroup<IDatabaseConnection>[];
    DatabaseSource?: IDatabaseSourceProperties;
};

type DatabaseSourceProps = DbSource
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<DbSource, {}, DatabaseSourceProps>(mapStateToProps, mapDispatchToProps)
export default class DatabaseSource extends React.Component<DatabaseSourceProps> {
    /*
     *  Constructors
     */
    public constructor(props: DatabaseSourceProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleNameClick(source: IDatabaseSource): void {
        source.Name = "Test";
        this.props.addOrUpdateDatabaseSource(source);
    }

    private handleScriptFileNameChange(source: IDatabaseSourceProperties, value: string): void {
        source.Script.Path = value;
        this.props.addOrUpdateDatabaseSource(source as IDatabaseSource);
    }

    private handleActiveConnectionChange(ev: React.ChangeEvent<HTMLSelectElement>): void {
        this.props.DatabaseSource.ActiveConnectionGroup = this.props.DatabaseConnections.find(x => x.ID === ev.target.value);
        this.props.addOrUpdateDatabaseSource(this.props.DatabaseSource);
    }

    public render(): JSX.Element {
        const jsonEditorContainerId: string = `databaseSourceJsonResultsEditorContainer${this.props.match.params.id}`;
        const xmlEditorContainerId: string = `databaseSourceXmlResultsEditorContainer${this.props.match.params.id}`;

        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <Row className="mb-2">
                        <Cell colSpan={12}>
                            <h3>
                                <span className="mif-database mif-md mr-2"></span>
                                <span onClick={this.handleNameClick.bind(this, this.props.DatabaseSource)}>{this.props.DatabaseSource.Name}</span>
                            </h3>
                        </Cell>
                    </Row>

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton iconClassName="mif-arrow-left" linkTo="/sources/db" buttonText="View All Sources"></LinkButton>
                        </Cell>
                    </Row>

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <select
                                onChange={this.handleActiveConnectionChange.bind(this)}>
                                {
                                    this.props.DatabaseConnections.map((dbConn, i) =>
                                        <option key={i} value={dbConn.ID}>{dbConn.Name}</option>
                                    )
                                }
                            </select>
                        </Cell>
                    </Row>

                    <SplitPane splitPaneProps={{ split: `vertical`, size: `calc(50% - 15px)` }}>
                        <div className="h-100 w-100">
                            <Row>
                                <Cell colSpan={4}>
                                    <div className="pos-center text-right">Database Script:</div>
                                </Cell>
                                <Cell colSpan={8}>
                                    <FileInput
                                        onFilePathChange={(value: string) => this.handleScriptFileNameChange(this.props.DatabaseSource, value)}
                                        value={this.props.DatabaseSource.Script.Path}
                                    />
                                </Cell>
                            </Row>

                            <Row className="h-100 mt-1">
                                <Cell className="h-100">
                                    <MonacoEditor
                                        language="sql"
                                        value={this.props.DatabaseSource.Script.Contents || (() => { }).toString()}
                                        options={{wordWrap: `on`}}
                                        onChange={() => { }}
                                        editorDidMount={() => {}}
                                    />
                                </Cell>
                            </Row>
                        </div>

                        <div className="h-100 w-100">
                            <ul data-role="tabs" data-expand="true">
                                <li>
                                    <a href={`#${jsonEditorContainerId}`}>JSON Results</a>
                                </li>
                                <li>
                                    <a href={`#${xmlEditorContainerId}`}>XML Results</a>
                                </li>
                            </ul>
                            <div className="h-100">
                                <div className="h-100" id={jsonEditorContainerId}>
                                    <MonacoEditor
                                        editorDidMount={() => { }}
                                        language="json"
                                        onChange={console.log}
                                        options={{ readOnly: true, wordWrap: `on` }}
                                        value={`{\n\t"Data": "Execute Query to view JSON results"\n}`}
                                    />
                                </div>
                                <div className="h-100" id={xmlEditorContainerId}>
                                    <MonacoEditor
                                        editorDidMount={() => { }}
                                        language="xml"
                                        onChange={console.log}
                                        options={{ readOnly: true, wordWrap: `on` }}
                                        value={`<Root>\n\t<Data>Execute Query to view XML results</Data>\n</Root>`}
                                    />
                                </div>
                            </div>
                        </div>
                    </SplitPane>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ id: string }>): DbSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.DatabaseSources[id] || "")
    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        DatabaseSource: state.PackageSettings.DatabaseSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}