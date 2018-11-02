"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const $ = require("jquery");
window.jQuery = $;
window.$ = $;
const metro4 = require("metro4");
window.Metro = metro4;
const React = require("react");
const ReactDOM = require("react-dom");
const history_1 = require("history");
const Gentron_Library_1 = require("../Gentron.Library");
const Gentron_Library_2 = require("../Gentron.Library");
const react_redux_1 = require("react-redux");
const App_1 = require("./components/App");
const configureStore_1 = require("./store/configureStore");
const electronMenu_1 = require("./electronMenu");
const syncHistoryWithStore = (store, history) => {
    const { routing } = store.getState();
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};
electronMenu_1.default();
const history = history_1.createMemoryHistory();
let initialState;
if ((window.initialReduxState)) {
    initialState = window.initialReduxState;
}
else {
    initialState = new Gentron_Library_1.Gentron();
    ["Dev", "Test", "Prod"].map(env => {
        const environment = new Gentron_Library_1.Environment();
        environment.Name = env;
        initialState.PackageSettings.Environments.push(environment);
    });
    ["CAUtils", "CASecurity"].map(db => {
        const source = new Gentron_Library_1.ConnectionGroup(() => new Gentron_Library_1.DatabaseConnection());
        source.Name = db;
        initialState.PackageSettings.Environments.map(env => {
            const conn = new Gentron_Library_1.DatabaseConnection();
            conn.Environment = env.Name;
            source.addOrUpdateConnection(conn);
        });
        initialState.ProjectSettings.DatabaseConnections.push(source);
    });
    ["", ""].map((db, i) => {
        const source = new Gentron_Library_2.DatabaseSource();
        source.Name = `DBSource${i}`;
        initialState.PackageSettings.DatabaseSources.push(source);
    });
}
const store = configureStore_1.default(history, { ID: initialState.ID, PackageSettings: initialState.PackageSettings, ProjectSettings: initialState.ProjectSettings });
syncHistoryWithStore(store, history);
const root = document.createElement("div");
const rootId = `appRoot${Date.now()}`;
root.id = rootId;
root.className = "h-100 w-100";
document.body.appendChild(root);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.default, { history: history })), document.getElementById(rootId));
