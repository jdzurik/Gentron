import * as $ from "jquery";
(window as any).jQuery = $;
(window as any).$ = $;

import * as metro4 from "metro4";
(window as any).Metro = metro4;

import * as React from "react";
import * as ReactDOM from "react-dom";

import { AnyAction, Store } from "redux";
import { createMemoryHistory, MemoryHistory } from 'history';
import { Gentron, ConnectionGroup, IConnectionGroup, DatabaseConnection, IDatabaseConnection, IEnvironment, Environment } from "../Gentron.Library";
import { IDatabaseSource, IGentron, DatabaseSource } from "../Gentron.Library";
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

setupMenu();

// Create browser history to use in the Redux store
const history: MemoryHistory = createMemoryHistory();

// Get the application-wide store instance, prepopulating with state from the server where available.
let initialState: IGentron;

if (((window as any).initialReduxState)) {
    initialState = (window as any).initialReduxState;
}
else {
    initialState = new Gentron();

    ["Dev", "Test", "Prod"].map(env => {
        const environment: IEnvironment = new Environment();
        environment.Name = env;
        initialState.PackageSettings.Environments.push(environment);
    });

    ["CAUtils", "CASecurity"].map(db => {
        const source: IConnectionGroup<IDatabaseConnection> = new ConnectionGroup<IDatabaseConnection>();
        source.Name = db;

        initialState.PackageSettings.Environments.map(env => {
            const conn: IDatabaseConnection = new DatabaseConnection();
            conn.Environment = env.Name;
            source.addOrUpdateConnection(conn);
        });

        initialState.ProjectSettings.DatabaseConnections.push(source);
    });

    ["", ""].map((db, i) => {
        const source: IDatabaseSource = new DatabaseSource();
        source.Name = `DBSource${i}`;

        initialState.PackageSettings.DatabaseSources.push(source);
    });
}

//const initialState: IGentron = ((window as any).initialReduxState) || new Gentron() as IGentron;
const store: AppStore = configureStore(history, { ID: initialState.ID, PackageSettings: initialState.PackageSettings, ProjectSettings: initialState.ProjectSettings });
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