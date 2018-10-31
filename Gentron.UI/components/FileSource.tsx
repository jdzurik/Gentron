import * as hash from "object-hash";
import * as React from "react";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { IFileSource } from "../../Gentron.Library";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import MonacoEditor from 'react-monaco-editor';
import NavViewContentHeaderRow from "./NavViewContentHeaderRow";

type HashedFileSource = Hash & {
    FileSource?: NonFunctionProperties<IFileSource>;
};

type FileSourceProps = HashedFileSource
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedFileSource, {}, FileSourceProps>(mapStateToProps, mapDispatchToProps)
export default class FileSource extends React.Component<FileSourceProps> {
    /*
     *  Constructors
     */
    public constructor(props: FileSourceProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <NavViewContentHeaderRow iconClassName="mif-file-code" title={this.props.FileSource.Name} />

                    <Row className="mt-2 mb-2">
                        <Cell>
                            <LinkButton
                                buttonText="View All Sources"
                                iconClassName="mif-arrow-left"
                                linkTo="/sources/file"
                            />
                        </Cell>
                    </Row>

                    <Row className="h-100 mt-2">
                        <Cell>
                            <div className="h-100 w-100 border bd-grayWhite border-size-2">
                                <MonacoEditor
                                    language="javascript"
                                    value={(() => { }).toString()}
                                    options={{ wordWrap: `on` }}
                                    onChange={console.log}
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

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ id: string }>): HashedFileSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.FileSources[id] || "")
    return {
        FileSource: state.PackageSettings.FileSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}