import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, FileSource as LibFileSource } from "../../Gentron.Library";
import { Cell, FileInput, Grid, LinkButton, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedFileSource = Hash & {
    FileSource?: LibFileSource;
};

type FileSourceProps = HashedFileSource
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedFileSource, {}, FileSourceProps>(mapStateToProps, mapDispatchToProps)
export default class FileSource extends React.Component<FileSourceProps> {
    /*
     *  Properties & Fields
     */
    private static readonly fileInputFilters = [
        { name: 'JSON', extensions: ['json'] }
    ];


    /*
     *  Constructors
     */
    public constructor(props: FileSourceProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleDataFileNameChange(value: string): void {
        const source: LibFileSource = this.props.FileSource.clone();
        source.DataFile.Path = value;
        this.props.addOrUpdateFileSource(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className='h-100'>
                <Grid className='w-100 h-100 p-3'>
                    <NavViewContentHeaderRow iconClassName='mif-file-code' title={this.props.FileSource.Name} />

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <LinkButton iconClassName='mif-arrow-left' linkTo='/sources/file' buttonText='View All Sources'></LinkButton>
                        </Cell>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Cell colSpan={4}>
                            <div className='pos-center text-right'>JSON File:</div>
                        </Cell>
                        <Cell colSpan={8}>
                            <FileInput filters={FileSource.fileInputFilters}
                                onFilePathChange={(value: string) => this.handleDataFileNameChange(value)}
                                value={this.props.FileSource.DataFile.Path}
                            />
                        </Cell>
                    </Row>

                    <Row className='h-100 mt-2'>
                        <Cell>
                            <div className='h-100 w-100 border bd-grayWhite border-size-2'>
                                <MonacoEditor
                                    language="json"
                                    value={this.props.FileSource.DataFile.Contents || '{\n}'}
                                    options={{ automaticLayout: true, wordWrap: 'on' }}
                                    onChange={() => { }}
                                    editorDidMount={() => { }}
                                />
                            </div>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ id: string }>): HashedFileSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.FileSources[id] || '')
    return {
        FileSource: state.PackageSettings.FileSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}