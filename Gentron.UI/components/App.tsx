import * as React from "react";
import * as ReactDOM from "react-dom";
import NavView from "./NavView";
import { History } from "history";

type AppProps = {
    history: History;
};

export default class App extends React.PureComponent<AppProps> {
    public constructor(props: AppProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className={`h-100 w-100`}>
                <NavView history={this.props.history} />
            </div>
        );
    }
}