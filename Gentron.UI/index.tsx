import * as $ from "jquery";
(window as any).jQuery = $;
(window as any).$ = $;

import * as metro4 from "metro4";
(window as any).Metro = metro4;

import * as React from "react";
import * as ReactDOM from "react-dom";

import { AnyAction, Store } from "redux";
import { ApplicationState } from './actions';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Gentron } from "../Gentron.Library";
import { Provider } from 'react-redux';
import App from "./components/App";
import configureStore from './store/configureStore';
import setupMenu from "./electronMenu";

type AppStore = Store<ApplicationState, AnyAction> & { dispatch: {} };

const syncHistoryWithStore = (store, history: MemoryHistory) => {
    const { routing } = store.getState();
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};

setupMenu();

// Create browser history to use in the Redux store
const history: MemoryHistory = createMemoryHistory();

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState: ApplicationState = ((window as any).initialReduxState) || new Gentron() as ApplicationState;
const store: AppStore = configureStore(history, initialState);
syncHistoryWithStore(store, history);

const root: HTMLElement = document.createElement("div");
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