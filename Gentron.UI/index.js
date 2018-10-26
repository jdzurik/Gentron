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
const DatabaseSource_1 = require("../Gentron.Library/DatabaseSource");
const react_redux_1 = require("react-redux");
const App_1 = require("./components/App");
const configureStore_1 = require("./store/configureStore");
const syncHistoryWithStore = (store, history) => {
    const { routing } = store.getState();
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};
const history = history_1.createMemoryHistory();
let initialState;
if ((window.initialReduxState)) {
    initialState = window.initialReduxState;
}
else {
    initialState = new Gentron_Library_1.Gentron();
    ["CAUtils", "CASecurity"].map(db => {
        const source = new Gentron_Library_1.ConnectionGroup();
        source.Name = db;
        ["Dev", "Test", "Prod"].map(env => {
            const conn = new Gentron_Library_1.DatabaseConnection();
            conn.Environment = env;
            source.addOrUpdateConnection(conn);
        });
        initialState.ProjectSettings.DatabaseConnections.push(source);
    });
    ["", ""].map((db, i) => {
        const source = new DatabaseSource_1.DatabaseSource();
        source.Name = `DBSource${i}`;
        initialState.PackageSettings.DatabaseSources.push(source);
    });
}
const store = configureStore_1.default(history, initialState.toJson());
syncHistoryWithStore(store, history);
const root = document.createElement("div");
const rootId = `appRoot${Date.now()}`;
root.id = rootId;
root.className = "h-100 w-100";
document.body.appendChild(root);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.default, { history: history })), document.getElementById(rootId));
