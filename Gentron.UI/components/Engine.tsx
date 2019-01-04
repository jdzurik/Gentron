declare type TMetro = typeof import('metro4');
declare const Metro: TMetro;

import * as hash from 'object-hash';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from './NavViewContentHeaderRow';
import { ActionCreators as PackageSettingsActionCreators } from '../actions/PackageSettings';
import { ActionCreators as ProjectSettingsActionCreators } from '../actions/ProjectSettings';
import { bindActionCreators } from 'redux';
import { Cell, FileInput, Grid, LinkButton, Row } from './metro';
import { connect } from '../connect';
import { Engine as LibEngine, IGentron, SerializationUtils, PackageSettings } from '../../Gentron.Library';
import { Hash } from '../../Gentron.Library/types';
import { RouteComponentProps } from 'react-router';
import { Result } from '../../Gentron.Library/results';
import { remote } from "electron";

type HashedEngine = Hash & {
    Engine?: LibEngine;
    LocalPackageFolder?: string;
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

    private static readonly fileInputFilters = [
        { name: 'JavaScript', extensions: ['js'] }
    ];


    /*
     *  Constructors
     */
    public constructor(props: EngineProps) {
        super(props);

        this.monacoEditorRef = React.createRef();
    }


    /*
     *  Methods
     */
    private handleDataFileNameChange(value: string): void {
        const source: LibEngine = this.props.Engine.clone();
        source.EngineCode.Path = value;
        this.props.addOrUpdateEngine(source);
    }

    private handleExecuteTemplateEngineClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        this.props.Engine.execute(
            remote.app.getAppPath(), 
            this.props.LocalPackageFolder, 
            this.props.Results
        );
        // this.props.Engine.testScript(
        //     (this.monacoEditorRef.current as any).editor.model.getValue()
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
            Metro.toast.create('Saved Successfully!', null, 3000, 'success');
        }
    }

    public render(): JSX.Element {
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
                        <Cell colSpan={4}>
                            <div className='pos-center text-right'>Engine Code:</div>
                        </Cell>
                        <Cell colSpan={8}>
                            <FileInput filters={Engine.fileInputFilters}
                                onFilePathChange={(value: string) => this.handleDataFileNameChange(value)}
                                value={this.props.Engine.EngineCode.Path}
                            />
                        </Cell>
                    </Row>

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

                    <Row className='mt-2 mb-2'>
                        <Cell colSpan={6}>
                            <button className='button'
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
        Results: packageSettings.buildDataSourceResults(),
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...PackageSettingsActionCreators, ...ProjectSettingsActionCreators }, dispatch);
}