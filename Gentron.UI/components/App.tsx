import * as React from "react";
import * as ReactDOM from "react-dom";
import NavView from "./NavView";

export default class App extends React.PureComponent {
    public constructor() {
        super(null);
    }

    public render(): JSX.Element {
        return (
            <div className={`h-100 w-100`}>
                <NavView />
            </div>
        );
    }
}