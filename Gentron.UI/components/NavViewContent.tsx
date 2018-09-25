import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import PackageSettings from './PackageSettings';
import ProjectSettings from './ProjectSettings';
import FileSources from './FileSources';
import DatabaseSources from './DatabaseSources';
import HttpSources from './HttpSources';

type NavViewContentProps = {};

export default class NavViewContent extends React.Component<NavViewContentProps> {
    private _displayBlock: React.CSSProperties = {
        display: `block`
    }

    private _displayNone: React.CSSProperties = {
        display: `none`
    }

    public constructor(props: NavViewContentProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className={`navview-content d-flex flex-align-center flex-justify-center h-100`}>
                <Route exact path="/" component={Home} />
                <Route exact path="/settings/project" component={ProjectSettings} />
                <Route exact path="/settings/package" component={PackageSettings} />
                <Route exact path="/sources/db" component={DatabaseSources} />
                <Route exact path="/sources/http" component={HttpSources} />
                <Route exact path="/sources/file" component={FileSources} />
            </div>
        );
    }
}