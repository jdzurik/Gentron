import * as React from "react";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import NavViewContent from "./NavViewContent";
import NavViewPane from "./NavViewPane";

type AppProps = {
    history: History;
};

export default class App extends React.Component<AppProps> {
    /*
     *  Constructors
     */
    public constructor(props: AppProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <div className="h-100 w-100">
                <ConnectedRouter history={this.props.history}>
                    <div data-role="navview">
                        <NavViewPane />
                        <NavViewContent />
                    </div>
                </ConnectedRouter>
            </div>
        );
    }
}