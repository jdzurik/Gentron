import * as $ from "jquery";
(window as any).jQuery = $;
(window as any).$ = $;

import * as metro4 from "metro4";
(window as any).Metro = metro4;
declare type TMetro = typeof import("metro4");
declare const Metro: TMetro;

//const DatabaseSource = require('../Gentron.Library/DatabaseSource').default;

import * as React from "react";
import * as ReactDOM from "react-dom";

import { AnyAction, Store } from "redux";
import { createMemoryHistory, MemoryHistory } from 'history';
import { Gentron, IGentron } from "../Gentron.Library";
import { Provider } from 'react-redux';
import App from "./components/App";
import configureStore from './store/configureStore';
import setupMenu from "./electronMenu";

type AppStore = Store<IGentron, AnyAction> & { dispatch: {} };

const syncHistoryWithStore = (store, history: MemoryHistory) => {
    const { routing } = store.getState();
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};

// Create browser history to use in the Redux store
const history: MemoryHistory = createMemoryHistory();

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState: Gentron = (((window as any).initialReduxState))
    ? (window as any).initialReduxState
    : new Gentron();

const store: AppStore = configureStore(history, initialState);
syncHistoryWithStore(store, history);

setupMenu(store);

const root: HTMLDivElement = document.createElement("div");
const rootId: string = `appRoot${Date.now()}`;
root.id = rootId;
root.className = "h-100 w-100";
document.body.appendChild(root);

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById(rootId)
);

if (process.env.toString() !== "production" && (module as any).hot) {
    (module as any).hot.accept("./components/App", () => {
        const NewApp: typeof App = require("./components/App").default;
        ReactDOM.render(
            <Provider store={store}>
                <NewApp history={history} />
            </Provider>,
            document.getElementById(rootId)
        );   
    });
}
