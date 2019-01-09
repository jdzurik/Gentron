import * as React from "react";
import { History } from "history";
import NavView from "./NavView";

type AppProps = {
    history: History;
};

export default class App extends React.PureComponent<AppProps> {
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
            <div className='h-100 w-100'>
                <NavView history={this.props.history} />
            </div>
        );
    }
}