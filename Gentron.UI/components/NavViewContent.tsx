import * as React from "react";
import { Route } from 'react-router-dom';
import DatabaseConnections from "./DatabaseConnections";
import DatabaseSource from './DatabaseSource';
import DatabaseSources from './DatabaseSources';
import Engine from "./Engine";
import Engines from "./Engines";
import Environments from "./Environments";
import FileSource from './FileSource';
import FileSources from './FileSources';
import Home from './Home';
import HttpSource from './HttpSource';
import HttpSources from './HttpSources';
import OutputPaths from "./OutputPaths";
import PackageSettings from './PackageSettings';
import ProjectSettings from './ProjectSettings';
import Template from "./Template";
import Templates from "./Templates";

type NavViewContentProps = {};

export default class NavViewContent extends React.Component<NavViewContentProps> {
    /*
     *  Constructors
     */
    public constructor(props: NavViewContentProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <div className="navview-content d-flex flex-align-center flex-justify-center h-100">
                <Route exact path="/" component={Home} />
                <Route exact path="/settings/project" component={ProjectSettings} />
                <Route exact path="/connections/db" component={DatabaseConnections} />
                <Route exact path="/environments" component={Environments} />
                <Route exact path="/output/paths" component={OutputPaths} />
                <Route exact path="/settings/package" component={PackageSettings} />
                <Route exact path="/sources/db" component={DatabaseSources} />
                <Route exact path="/sources/db/:id" component={DatabaseSource} />
                <Route exact path="/sources/http" component={HttpSources} />
                <Route exact path="/sources/http/:id" component={HttpSource} />
                <Route exact path="/sources/file" component={FileSources} />
                <Route exact path="/sources/file/:id" component={FileSource} />
                <Route exact path="/engines/manage" component={Engines} />
                <Route exact path="/engines/manage/:id" component={Engine} />
                <Route exact path="/engines/manage/:engineid/templates" component={Templates} />
                <Route exact path="/engines/manage/:engineid/templates/:templateid" component={Template} />
            </div>
        );
    }
}