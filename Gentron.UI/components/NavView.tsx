import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from 'react-router-dom';
import NavViewContent from "./NavViewContent";
import NavViewPane from "./NavViewPane";
import Home from './Home';
import PackageSettings from './PackageSettings';
import ProjectSettings from './ProjectSettings';
import FileSources from './FileSources';
import DatabaseSources from './DatabaseSources';
import HttpSources from './HttpSources';
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";

type NavViewProps = {
    history: History;
};

export default class NavView extends React.Component<NavViewProps> {
    public constructor(props: NavViewProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <ConnectedRouter history={this.props.history}>
                <div data-role="navview">
                    <NavViewPane />
                    <div className={`navview-content d-flex flex-align-center flex-justify-center h-100`}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/settings/project" component={ProjectSettings} />
                        <Route exact path="/settings/package" component={PackageSettings} />
                        <Route exact path="/sources/db/:id" component={DatabaseSources} />
                        <Route exact path="/sources/http/:id" component={HttpSources} />
                        <Route exact path="/sources/file/:id" component={FileSources} />
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}