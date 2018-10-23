import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from 'react-router-dom';
import DatabaseConnections from "./DatabaseConnections";
import DatabaseSource from './DatabaseSource';
import DatabaseSources from './DatabaseSources';
import FileSource from './FileSource';
import FileSources from './FileSources';
import Home from './Home';
import HttpSource from './HttpSource';
import HttpSources from './HttpSources';
import PackageSettings from './PackageSettings';
import ProjectSettings from './ProjectSettings';

type NavViewContentProps = {};

export default class NavViewContent extends React.Component<NavViewContentProps> {
    public constructor(props: NavViewContentProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className={`navview-content d-flex flex-align-center flex-justify-center h-100`}>
                <Route exact path="/" component={Home} />
                <Route exact path="/settings/project" component={ProjectSettings} />
                <Route exact path="/connections/db" component={DatabaseConnections} />
                <Route exact path="/settings/package" component={PackageSettings} />
                <Route exact path="/sources/db" component={DatabaseSources} />
                <Route exact path="/sources/db/:id" component={DatabaseSource} />
                <Route exact path="/sources/http" component={HttpSources} />
                <Route exact path="/sources/http/:id" component={HttpSource} />
                <Route exact path="/sources/file" component={FileSources} />
                <Route exact path="/sources/file/:id" component={FileSource} />
            </div>
        );
    }
}