import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom'

type NavVIewPaneProps = {};

export default class NavViewPane extends React.Component<NavVIewPaneProps> {
    public constructor(props: NavVIewPaneProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className={`navview-pane h-100`}>
                <button className={`pull-button`}>
                    <span className={`default-icon-menu`}></span>
                </button>

                <ul className={`navview-menu h-100`}>
                    <li>
                        <Link to="/">
                            <span className={`icon`}><span className={`mif-home`}></span></span>
                            <span className={`caption`}>Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/settings/project">
                            <span className={`icon`}><span className={`mif-drive2`}></span></span>
                            <span className={`caption`}>Project Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/settings/package">
                            <span className={`icon`}><span className={`mif-gift`}></span></span>
                            <span className={`caption`}>Package Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/sources/db">
                            <span className={`icon`}><span className={`mif-database`}></span></span>
                            <span className={`caption`}>Database Sources</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/sources/db/1">
                            <span className={`icon`}><span className={`mif-database`}></span></span>
                            <span className={`caption`}>Database 1</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/sources/db/2">
                            <span className={`icon`}><span className={`mif-database`}></span></span>
                            <span className={`caption`}>Database 2</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/sources/http">
                            <span className={`icon`}><span className={`mif-earth`}></span></span>
                            <span className={`caption`}>HTTP Sources</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/sources/file">
                            <span className={`icon`}><span className={`mif-drive`}></span></span>
                            <span className={`caption`}>File Sources</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}