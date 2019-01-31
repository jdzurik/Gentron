declare type TMetro = typeof import('metro4');
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
import { Engine as LibEngine, IGentron, SerializationUtils, PackageSettings, OutputPathGroup, OutputPath, ObjectUtils } from '../../Gentron.Library';
import { Hash } from '../../Gentron.Library/types';
import { RouteComponentProps } from 'react-router';
import { Result } from '../../Gentron.Library/results';
import { remote } from "electron";
import { render } from 'react-dom';

type HashedEngine = Hash & {
    Engine?: LibEngine;
    LocalPackageFolder?: string;
    OutputPathGroups?: OutputPathGroup<OutputPath>[];
    Results: any;
};

type EngineProps = HashedEngine
    & typeof PackageSettingsActionCreators
    & typeof ProjectSettingsActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedEngine, {}, EngineProps>(mapStateToProps, mapDispatchToProps)
export default class Engine extends React.Component<EngineProps> {
    /*
     *  Properties & Fields
     */
    private monacoEditorRef: React.RefObject<MonacoEditor>;
    private monacoEditorRefResult: React.RefObject<MonacoEditor>;

    private static readonly fileInputFilters = [
        { name: 'JavaScript', extensions: ['js'] }
    ];


    /*
     *  Constructors
     */
    public constructor(props: EngineProps) {
        super(props);

        this.monacoEditorRef = React.createRef();
        this.monacoEditorRefResult = React.createRef();
    }


    /*
     *  Methods
     */
    private handleDataFileNameChange(value: string): void {
        const source: LibEngine = this.props.Engine.clone();
        source.EngineCode.Path = value;
        this.props.addOrUpdateEngine(source);
    }

    private handleActiveOutputPathGroupChange(ev: React.ChangeEvent<HTMLSelectElement>): void {
        this.props.Engine.ActiveOutputPathGroup = this.props.OutputPathGroups.find(x => x.ID === ev.target.value);
        this.props.addOrUpdateEngine(this.props.Engine);
    }

    private handleTestScriptClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        this.props.Engine.testScript(
            (this.monacoEditorRef.current as any).editor.model.getValue()
        );
    }

    private handleExecuteTemplateEngineClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        
        
        this.props.Engine.run(
            this.props.LocalPackageFolder,
            this.props.Results, 
            (outputdata) => {
               console.log("run:"+outputdata);
               if(outputdata != null){
                   var ou = outputdata.toString();
               (this.monacoEditorRefResult.current as any).editor.setValue(ou);
                }
            }
        );
        // this.props.Engine.execute(
        //     remote.app.getAppPath(),
        //     this.props.LocalPackageFolder,
        //     this.props.Results
        // );
    }

    private handleSaveQueryClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        const source: LibEngine = this.props.Engine.clone();
        source.EngineCode.Contents = (this.monacoEditorRef.current as any).editor.model.getValue();
        this.props.addOrUpdateEngine(source);
        const saveResult: Result<void> = source.EngineCode.writeContents();

        if (saveResult.IsError) {
            Metro.toast.create(saveResult.ErrorMessage, null, 7500, 'warning');
        }
        else {
            Metro.toast.create('Engine Code Saved Successfully!', null, 3000, 'success');
        }
    }

    public render(): JSX.Element {
        const hasOutputPathGroups: boolean = (ObjectUtils.isArray(this.props.OutputPathGroups) && this.props.OutputPathGroups.length > 0);
        const activeOutputPathGroup: OutputPathGroup<OutputPath> = this.props.Engine.ActiveOutputPathGroup;
        const engineOutputResultsContainerId: string = `engineOutputResultsEditorContainer${this.props.match.params.id}`;
        const engineResult: string = (ObjectUtils.isObject(this.props.Engine.OutputResult))
            ? this.props.Engine.OutputResult || '{\n\t"Data": "Execute Engine to view results"\n}'
            : '{\n\t"Data": "Execute Engine to view results"\n}';
        const selectedOutputPathId: string = (ObjectUtils.hasObjectValue(activeOutputPathGroup)
            && hasOutputPathGroups
            && this.props.OutputPathGroups.filter(o => o.ID === activeOutputPathGroup.ID).length === 1)
            ? activeOutputPathGroup.ID
            : '';

        return (
            <Cell className='h-100'>
                <Grid className='w-100 h-100 p-3'>
                    <NavViewContentHeaderRow iconClassName='mif-drive-eta' title={this.props.Engine.Name} />

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <LinkButton iconClassName='mif-arrow-left'
                                linkTo='/engines/manage'
                                buttonText='View All Engines'>
                            </LinkButton>
                            <LinkButton iconClassName='mif-arrow-right'
                                iconPosition='forward'
                                linkTo={`/engines/manage/${this.props.match.params.id}/templates`}
                                buttonText='Manage Templates'
                                buttonClassName='ml-2'>
                            </LinkButton>
                        </Cell>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <div className='pos-center text-right'>Engine Code:</div>
                        </Cell>
                        <Cell colSpan={11}>
                            <FileInput filters={Engine.fileInputFilters}
                                onFilePathChange={(value: string) => this.handleDataFileNameChange(value)}
                                value={this.props.Engine.EngineCode.Path}
                            />
                        </Cell>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <div className='pos-center text-right'>Output Path:</div>
                        </Cell>
                        <Cell colSpan={11}>
                            <select
                                onChange={this.handleActiveOutputPathGroupChange.bind(this)}
                                style={{ WebkitAppearance: 'menulist' }}
                                value={selectedOutputPathId}>
                                <option value=''>--- Select Output Path ---</option>
                                {
                                    (hasOutputPathGroups)
                                        ? this.props.OutputPathGroups.map((connectionGroup: OutputPathGroup<OutputPath>, i: number) => {
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
                    <Row className='h-100 mt-2'>
                        <Cell>
                            <div className='h-100 w-100 border bd-grayWhite border-size-2'>
                                <MonacoEditor
                                    ref={this.monacoEditorRef}
                                    language='javascript'
                                    value={this.props.Engine.EngineCode.Contents || (() => { }).toString()}
                                    options={{ automaticLayout: true, wordWrap: 'on' }}
                                    onChange={() => { }}
                                    editorDidMount={() => { }}
                                />
                            </div>
                        </Cell>
                    </Row>
                    </div>
                    <div className='h-100 w-100'>
                    <Row className='h-100 mt-2'>
                        <Cell>
                        <div className='h-100' id={engineOutputResultsContainerId}>
                                    <MonacoEditor
                                        ref={this.monacoEditorRefResult}
                                        editorDidMount={() => { }}
                                        language='json'
                                        options={{ automaticLayout: true, readOnly: true, wordWrap: 'on' }}
                                        value={engineResult}
                                    />
                        </div>
                        </Cell>
                    </Row>
                    </div>
                    </SplitPane>

                    <Row className='mt-2 mb-2'>
                        <Cell colSpan={6}>
                            <button className='button'
                                onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleTestScriptClick(ev)}>
                                Test Script
                            </button>

                            <button className='button'
                                style={{ marginLeft: '5px' }}
                                onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleExecuteTemplateEngineClick(ev)}>
                                Execute Template Engine
                            </button>

                            <button className='button'
                                style={{ marginLeft: '5px' }}
                                onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleSaveQueryClick(ev)}>
                                Save Engine Code
                            </button>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ id: string }>): HashedEngine {
    const id: string = routeComponentProps.match.params.id;
    const _localPkgFolderHash: string = hash(state.ProjectSettings.LocalPackageFolder);
    const _engineHash: string = hash(state.PackageSettings.Engines[id] || '');
    const _hash: string = hash(_localPkgFolderHash + _engineHash);

    const packageSettings: PackageSettings = SerializationUtils.TaJson.deserialize(state.PackageSettings, PackageSettings);
    packageSettings.mergeResults(state.PackageSettings);

    return {
        Engine: state.PackageSettings.Engines[id],
        LocalPackageFolder: state.ProjectSettings.LocalPackageFolder,
        OutputPathGroups: state.ProjectSettings.OutputPathGroups,
        Results: packageSettings.buildDataSourceResults(),
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}