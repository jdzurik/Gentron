import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { connect } from "../connect";
import { IDatabaseSource } from "../../Gentron.Library";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { RouteComponentProps } from "react-router";
import SplitPane from "./SplitPane";
import MonacoEditor from 'react-monaco-editor';

type DbSource = Hash & {
    DatabaseSource?: NonFunctionProperties<IDatabaseSource>;
};

type DatabaseSourceProps = DbSource
    & typeof ActionCreators
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

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <Row>
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

                    <SplitPane splitPaneProps={{ split: `vertical`, size: `calc(50% - 15px)` }}>
                        <div className="h-100 w-100">
                            <MonacoEditor
                                language="javascript"
                                value={(() => { }).toString()}
                                options={{}}
                                onChange={console.log}
                                editorDidMount={console.log}
                            />
                        </div>
                        <div className="h-100 w-100">
                            <MonacoEditor
                                language="javascript"
                                value={(() => { }).toString()}
                                options={{}}
                                onChange={console.log}
                                editorDidMount={console.log}
                            />
                        </div>
                    </SplitPane>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ id: string }>): DbSource {
    const id: string = routeComponentProps.match.params.id;
    const _hash: string = hash(state.PackageSettings.DatabaseSources[id] || "")
    return {
        DatabaseSource: state.PackageSettings.DatabaseSources[id],
        _hash: _hash
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}