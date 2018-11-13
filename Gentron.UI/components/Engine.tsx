import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { Hash } from "../../Gentron.Library/types";
import { IGentron, Engine as LibEngine } from "../../Gentron.Library";
import { Cell, FileInput, Grid, LinkButton, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedEngine = Hash & {
    Engine?: LibEngine;
};

type EngineProps = HashedEngine
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedEngine, {}, EngineProps>(mapStateToProps, mapDispatchToProps)
export default class Engine extends React.Component<EngineProps> {
    /*
     *  Properties & Fields
     */
    private static readonly fileInputFilters = [
        { name: 'JavaScript', extensions: ['js'] }
    ];


    /*
     *  Constructors
     */
    public constructor(props: EngineProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleDataFileNameChange(value: string): void {
        const source: LibEngine = this.props.Engine.clone();
        source.EngineCode.Path = value;
        this.props.addOrUpdateEngine(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-drive-eta" title={this.props.Engine.Name} />

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton iconClassName="mif-arrow-left"
                                linkTo="/engines/manage"
                                buttonText="View All Engines">
                            </LinkButton>
                            <LinkButton iconClassName="mif-arrow-right"
                                iconPosition="forward"
                                linkTo={`/engines/manage/${this.props.match.params.id}/templates`}
                                buttonText="Manage Templates"
                                buttonClassName="ml-2">
                            </LinkButton>
                        </Cell>
                    </Row>

                    <Row className="mt-2 mb-2">
                        <Cell colSpan={4}>
                            <div className="pos-center text-right">Engine Code:</div>
                        </Cell>
                        <Cell colSpan={8}>
                            <FileInput filters={Engine.fileInputFilters}
                                onFilePathChange={(value: string) => this.handleDataFileNameChange(value)}
                                value={this.props.Engine.EngineCode.Path}
                            />
                        </Cell>
                    </Row>

                    <Row className="h-100 mt-2">
                        <Cell>
                            <div className="h-100 w-100 border bd-grayWhite border-size-2">
                                <MonacoEditor
                                    language="javascript"
                                    value={this.props.Engine.EngineCode.Contents || (() => { }).toString()}
                                    options={{ wordWrap: `on` }}
                                    onChange={() => { }}
                                    editorDidMount={() => {}}
                                />
                            </div>
                        </Cell>
                    </Row>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: IGentron, routeComponentProps: RouteComponentProps<{ id: string }>): HashedEngine {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.Engines[id] || "")
    return {
        Engine: state.PackageSettings.Engines[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}