﻿declare type TMetro = typeof import("metro4");
declare const Metro: TMetro;

import * as hash from 'object-hash';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from './NavViewContentHeaderRow';
import SplitPane from './SplitPane';
import { ActionCreators as PackageSettingsActionCreators } from '../actions/PackageSettings';
import { ActionCreators as ProjectSettingsActionCreators } from '../actions/ProjectSettings';
import { bindActionCreators } from 'redux';
import { Cell, FileInput, Grid, LinkButton, Row } from './metro';
import { connect } from '../connect';
import { ConnectionGroup, DatabaseConnection, DatabaseSource as LibDatabaseSource, IGentron, ObjectUtils } from '../../Gentron.Library';
import { Hash } from '../../Gentron.Library/types';
import { Result } from '../../Gentron.Library/results';
import { RouteComponentProps } from 'react-router';

type IDatabaseSourceProperties = LibDatabaseSource;

type DbSource = Hash & {
    DatabaseConnections?: ConnectionGroup<DatabaseConnection>[];
    DatabaseSource?: IDatabaseSourceProperties;
};

type DatabaseSourceProps = DbSource
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<DbSource, {}, DatabaseSourceProps>(mapStateToProps, mapDispatchToProps)
export default class DatabaseSource extends React.Component<DatabaseSourceProps> {
    /*
     *  Properties & Fields
     */
    private monacoEditorRef: React.RefObject<MonacoEditor>;

    private static readonly fileInputFilters = [
        { name: 'SQL', extensions: ['sql'] }
    ];


    /*
     *  Constructors
     */
    public constructor(props: DatabaseSourceProps) {
        super(props);
        this.monacoEditorRef = React.createRef();
    }


    /*
     *  Methods
     */
    private handleScriptFileNameChange(value: string): void {
        const source: LibDatabaseSource = this.props.DatabaseSource.clone();
        source.Script.Path = value;
        this.props.addOrUpdateDatabaseSource(source);
    }

    private handleActiveConnectionChange(ev: React.ChangeEvent<HTMLSelectElement>): void {
        this.props.DatabaseSource.ActiveConnectionGroup = this.props.DatabaseConnections.find(x => x.ID === ev.target.value);
        this.props.addOrUpdateDatabaseSource(this.props.DatabaseSource);
    }

    private handleExecuteQueryClick(): void {
        const source: LibDatabaseSource = this.props.DatabaseSource.clone();
        source.Script.Contents = (this.monacoEditorRef.current as any).editor.model.getValue();

        //  the redux db-source is explicitely updated by the call to execute query
        //this.props.addOrUpdateDatabaseSource(source);
        this.props.executeDatabaseSourceQuery(source);
    }

    private handleSaveQueryClick(): void {
        const source: LibDatabaseSource = this.props.DatabaseSource.clone();
        source.Script.Contents = (this.monacoEditorRef.current as any).editor.model.getValue();
        this.props.addOrUpdateDatabaseSource(source);
        const saveResult: Result<void> = source.Script.writeContents();

        if (saveResult.IsError) {
            Metro.toast.create(saveResult.ErrorMessage, null, 7500, 'warning');
        }
        else {
            Metro.toast.create('Saved Successfully!', null, 3000, 'success');
        }
    }

    public render(): JSX.Element {
        const hasDbConnectionGroups: boolean = (ObjectUtils.isArray(this.props.DatabaseConnections) && this.props.DatabaseConnections.length > 0);
        const activeConnectionGroup: ConnectionGroup<DatabaseConnection> = this.props.DatabaseSource.ActiveConnectionGroup;
        const selectedConnectionGroupId: string = (ObjectUtils.hasObjectValue(activeConnectionGroup)
            && hasDbConnectionGroups
            && this.props.DatabaseConnections.filter(o => o.ID === activeConnectionGroup.ID).length === 1)
            ? activeConnectionGroup.ID
            : '';

        const jsonEditorContainerId: string = `databaseSourceJsonResultsEditorContainer${this.props.match.params.id}`;
        const jsonResult: string = (ObjectUtils.isObject(this.props.DatabaseSource.Result))
            ? this.props.DatabaseSource.Result.Json || '{\n\t"Data": "Execute Query to view JSON results"\n}'
            : '{\n\t"Data": "Execute Query to view JSON results"\n}';

        const xmlEditorContainerId: string = `databaseSourceXmlResultsEditorContainer${this.props.match.params.id}`;
        const xmlResult: string = (ObjectUtils.isObject(this.props.DatabaseSource.Result))
            ? this.props.DatabaseSource.Result.Xml || '<Root>\n\t<Data>Execute Query to view XML results</Data>\n</Root>'
            : '<Root>\n\t<Data>Execute Query to view XML results</Data>\n</Root>'

        return (
            <Cell className='h-100'>
                <Grid className='w-100 h-100 p-3'>
                    <NavViewContentHeaderRow iconClassName='mif-database' title={this.props.DatabaseSource.Name} />

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <LinkButton iconClassName='mif-arrow-left' linkTo='/sources/db' buttonText='View All Sources'></LinkButton>
                        </Cell>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <label>Connection String</label>
                        </Cell>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <select
                                onChange={this.handleActiveConnectionChange.bind(this)}
                                style={{ WebkitAppearance: 'menulist' }}
                                value={selectedConnectionGroupId}>
                                <option value=''>--- Select Database Connection ---</option>
                                {
                                    (hasDbConnectionGroups)
                                        ? this.props.DatabaseConnections.map((connectionGroup: ConnectionGroup<DatabaseConnection>, i: number) => {
                                            return (
                                                <option key={i} value={connectionGroup.ID}>{connectionGroup.Name}</option>
                                            );
                                        })
                                        : null
                                }
                            </select>
                        </Cell>
                    </Row>

                    <SplitPane splitPaneProps={{ split: 'vertical', size: 'calc(50% - 15px)' }}>
                        <div className='h-100 w-100'>
                            <Row>
                                <Cell colSpan={4}>
                                    <div className='pos-center text-right'>Database Script:</div>
                                </Cell>
                                <Cell colSpan={8}>
                                    <FileInput filters={DatabaseSource.fileInputFilters}
                                        onFilePathChange={(value: string) => this.handleScriptFileNameChange(value)}
                                        value={this.props.DatabaseSource.Script.Path}
                                    />
                                </Cell>
                            </Row>

                            <Row className='h-100 mt-1'>
                                <Cell className='h-100'>
                                    <MonacoEditor
                                        ref={this.monacoEditorRef}
                                        language='sql'
                                        value={this.props.DatabaseSource.Script.Contents || (() => { }).toString()}
                                        options={{ automaticLayout: true, wordWrap: 'on' }}
                                        onChange={() => { }}
                                        editorDidMount={() => { }}
                                    />
                                </Cell>
                            </Row>
                        </div>

                        <div className='h-100 w-100'>
                            <ul data-role='tabs' data-expand='true'>
                                <li>
                                    <a href={`#${jsonEditorContainerId}`}>JSON Results</a>
                                </li>
                                <li>
                                    <a href={`#${xmlEditorContainerId}`}>XML Results</a>
                                </li>
                            </ul>
                            <div className='h-100'>
                                <div className='h-100' id={jsonEditorContainerId}>
                                    <MonacoEditor
                                        editorDidMount={() => { }}
                                        language='json'
                                        options={{ automaticLayout: true, readOnly: true, wordWrap: 'on' }}
                                        value={jsonResult}
                                    />
                                </div>
                                <div className='h-100' id={xmlEditorContainerId}>
                                    <MonacoEditor
                                        editorDidMount={() => { }}
                                        language='xml'
                                        options={{ automaticLayout: true, readOnly: true, wordWrap: 'on' }}
                                        value={xmlResult}
                                    />
                                </div>
                            </div>
                        </div>
                    </SplitPane>

                    <Row className='mt-2 mb-2'>
                        <Cell colSpan={6}>
                            <button className='button'
                                onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleExecuteQueryClick()}>
                                Execute Query
                            </button>
                            <button className='button'
                                style={{ marginLeft: '5px' }}
                                onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleSaveQueryClick()}>
                                Save Query
                            </button>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ id: string }>): DbSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.DatabaseSources[id] || '');

    return {
        DatabaseConnections: state.ProjectSettings.DatabaseConnections,
        DatabaseSource: state.PackageSettings.DatabaseSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}