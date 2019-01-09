import * as React from "react";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import NavViewContent from "./NavViewContent";
import NavViewPane from "./NavViewPane";

type NavViewProps = {
    history: History;
};

export default class NavView extends React.Component<NavViewProps> {
    /*
     *  Constructors
     */
    public constructor(props: NavViewProps) {
        super(props);
    }


    /*
     *  Methods
     */
    public render(): JSX.Element {
        return (
            <ConnectedRouter history={this.props.history}>
                <div data-role='navview'>
                    <NavViewPane />
                    <NavViewContent />
                </div>
            </ConnectedRouter>
        );
    }
}