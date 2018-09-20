import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from 'react-router-dom';
import NavViewContent from "./NavViewContent";
import NavViewPane from "./NavViewPane";

export default class NavView extends React.Component {
    public constructor() {
        super(null);
    }

    public render(): JSX.Element {
        return (
            <HashRouter>
                <div data-role="navview">
                    <NavViewPane />
                    <NavViewContent />
                </div>
            </HashRouter>
        );
    }
}