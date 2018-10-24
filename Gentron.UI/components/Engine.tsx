import * as hash from "object-hash";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ActionCreators } from "../actions/PackageSettings";
import { ApplicationState, Hash, NonFunctionProperties } from "../types";
import { bindActionCreators } from "redux";
import { LinkButton, Cell, Grid, Row } from "./metro";
import { connect } from "../connect";
import { IEngine } from "../../Gentron.Library";
import { RouteComponentProps } from "react-router";

type HashedEngine = Hash & {
    Engine?: NonFunctionProperties<IEngine>;
};

type EngineProps = HashedEngine
    & typeof ActionCreators
    & RouteComponentProps<{ id: string }>;

@connect<HashedEngine, {}, EngineProps>(mapStateToProps, mapDispatchToProps)
export default class Engine extends React.Component<EngineProps> {
    /*
     *  Constructors
     */
    public constructor(props: EngineProps) {
        super(props);
    }


    /*
     *  Methods
     */
    private handleNameClick(source: IEngine): void {
        source.Name = "Test";
        this.props.addOrUpdateEngine(source);
    }

    public render(): JSX.Element {
        return (
            <Cell className="h-100">
                <Grid className="w-100 h-100 p-3">
                    <Row>
                        <Cell colSpan={12}>
                            <h3>
                                <span className="mif-drive-eta mif-md mr-2"></span>
                                <span onClick={this.handleNameClick.bind(this, this.props.Engine)}>{this.props.Engine.Name}</span>
                            </h3>
                        </Cell>
                    </Row>

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

                    <h1>{this.props.match.params.id}</h1>
                </Grid>
            </Cell>
        );
    }
}

function mapStateToProps(state: ApplicationState, routeComponentProps: RouteComponentProps<{ id: string }>): HashedEngine {
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