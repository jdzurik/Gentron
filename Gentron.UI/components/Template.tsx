declare type TMetro = typeof import('metro4');
declare const Metro: TMetro;

import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, Template as LibTemplate, ObjectUtils, SerializationUtils, PackageSettings } from "../../Gentron.Library";
import { Cell, FileInput, Grid, LinkButton, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import SplitPane from "./SplitPane";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";
import { Result } from "../../Gentron.Library/results";

type HashedTemplate = Hash & {
    Results: any;
    Template?: LibTemplate;
};

type TemplateProps = HashedTemplate
    & typeof ActionCreators
    & RouteComponentProps<{ engineid: string, templateid: string }>;

@connect<HashedTemplate, {}, TemplateProps>(mapStateToProps, mapDispatchToProps)
export default class Template extends React.Component<TemplateProps> {
    /*
     *  Properties & Fields
     */
    private monacoEditorRef: React.RefObject<MonacoEditor>;
    
    
    /*
     *  Constructors
     */
    public constructor(props: TemplateProps) {
        super(props);

        this.monacoEditorRef = React.createRef();
    }


    /*
     *  Methods
     */
    private handleEditorWillMount(monaco: any): void {
        if (!ObjectUtils.hasObjectValue(this.props.Results)) {
            return;
        }

        const getProps = (obj: any) => {
            const props = {};

            for (let propName in obj) {
                const prop: any = obj[propName];
                const propType: string = typeof (prop);
                if (ObjectUtils.isPrimitive(prop)) {
                    props[propName] = propType;
                }
                else if (ObjectUtils.isObject(prop)) {
                    const newProp = getProps(prop);
                    let equal: boolean = false;
                    for (let key in props) {
                        if (ObjectUtils.equal(props[key], newProp)) {
                            equal = true;
                            break;
                        }
                    }

                    if (!equal) {
                        props[propName] = newProp;
                    }
                }
            }

            return props;
        }


        const props = getProps(this.props.Results);
        console.log(props);
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            schemas: [{
                schema: props
            }]
        });
    }


    private handleDataFileNameChange(value: string): void {
        const source: LibTemplate = this.props.Template.clone();
        source.TemplateCode.Path = value;
        this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, source);
    }

    private handleSaveQueryClick(ev: React.MouseEvent<HTMLButtonElement>): void {
        const source: LibTemplate = this.props.Template.clone();
        source.TemplateCode.Contents = (this.monacoEditorRef.current as any).editor.model.getValue();
        this.props.addOrUpdateEngineTemplate(this.props.match.params.engineid, source);
        const saveResult: Result<void> = source.TemplateCode.writeContents();

        if (saveResult.IsError) {
            Metro.toast.create(saveResult.ErrorMessage, null, 7500, 'warning');
        }
        else {
            Metro.toast.create('Saved Successfully!', null, 3000, 'success');
        }
    }    

    public render(): JSX.Element {
        const results: string = (ObjectUtils.hasValue(this.props.Results) && this.props.Results.toString().trim().length > 2)
            ? JSON.stringify(this.props.Results, null, 4)
            : '{\n}'

        return (
            <Cell className='h-100'>
                <Grid className='w-100 h-100 p-3'>
                    <NavViewContentHeaderRow iconClassName='mif-embed2' title={this.props.Template.Name} />

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <LinkButton iconClassName='mif-arrow-left' linkTo={`/engines/manage/${this.props.match.params.engineid}`} buttonText='View All Engine Templates'></LinkButton>
                        </Cell>
                    </Row>

                    <Row className='mt-2 mb-2'>
                        <Cell>
                            <div className='pos-center'>Template File:</div>
                        </Cell>
                        <Cell colSpan={11}>
                            <FileInput onFilePathChange={(value: string) => this.handleDataFileNameChange(value)}
                                value={this.props.Template.TemplateCode.Path}
                            />
                        </Cell>
                    </Row>

                    <SplitPane splitPaneProps={{ split: 'vertical', size: 'calc(50% - 15px)' }}>
                        <div className='h-100 w-100'>
                            <MonacoEditor
                                ref={this.monacoEditorRef}
                                language='plaintext'
                                value={this.props.Template.TemplateCode.Contents || ''}
                                options={{ automaticLayout: true, wordWrap: 'on' }}
                                onChange={() => { }}
                                editorDidMount={() => { }}
                                editorWillMount={/*this.handleEditorWillMount.bind(this)*/ () => { }}
                            />
                        </div>
                        <div className='h-100 w-100'>
                            <MonacoEditor
                                language='javascript'
                                value={results}
                                options={{ automaticLayout: true, readOnly: true, wordWrap: 'on' }}
                                editorDidMount={() => {}}
                            />
                        </div>
                    </SplitPane>

                    <Row className='mt-2 mb-2'>
                        <Cell colSpan={6}>
                            <button className='button'
                                onClick={(ev: React.MouseEvent<HTMLButtonElement>) => this.handleSaveQueryClick(ev)}>
                                Save Template Code
                            </button>
                        </Cell>
                    </Row>                    
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ engineid: string, templateid: string }>): HashedTemplate {
    const engineid: string = routeComponentProps.match.params.engineid;
    const templateid: string = routeComponentProps.match.params.templateid;

    const _hash: string = hash(state.PackageSettings.Engines[engineid].Templates[templateid] || '');
    const packageSettings: PackageSettings = SerializationUtils.TaJson.deserialize(state.PackageSettings, PackageSettings);
    packageSettings.mergeResults(state.PackageSettings);
    return {
        Results: packageSettings.buildDataSourceResults(),
        Template: state.PackageSettings.Engines[engineid].Templates[templateid],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}