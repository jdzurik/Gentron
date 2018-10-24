"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
window.jQuery = $;
window.$ = $;
var metro4 = require("metro4");
window.Metro = metro4;
var React = require("react");
var ReactDOM = require("react-dom");
var history_1 = require("history");
var Gentron_Library_1 = require("../Gentron.Library");
var DatabaseSource_1 = require("../Gentron.Library/DatabaseSource");
var react_redux_1 = require("react-redux");
var App_1 = require("./components/App");
var configureStore_1 = require("./store/configureStore");
var syncHistoryWithStore = function (store, history) {
    var routing = store.getState().routing;
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};
var history = history_1.createMemoryHistory();
var initialState;
if ((window.initialReduxState)) {
    initialState = window.initialReduxState;
}
else {
    initialState = new Gentron_Library_1.Gentron();
    ["CAUtils", "CASecurity"].map(function (db) {
        var source = new Gentron_Library_1.ConnectionGroup();
        source.Name = db;
        ["Dev", "Test", "Prod"].map(function (env) {
            var conn = new Gentron_Library_1.DatabaseConnection();
            conn.Environment = env;
            source.addOrUpdateConnection(conn);
        });
        initialState.ProjectSettings.DatabaseConnections.push(source);
    });
    ["", ""].map(function (db, i) {
        var source = new DatabaseSource_1.DatabaseSource();
        source.Name = "DBSource" + i;
        initialState.PackageSettings.DatabaseSources.push(source);
    });
}
var store = configureStore_1.default(history, initialState.toJson());
syncHistoryWithStore(store, history);
var root = document.createElement("div");
var rootId = "appRoot" + Date.now();
root.id = rootId;
root.className = "h-100 w-100";
document.body.appendChild(root);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.default, { history: history })), document.getElementById(rootId));
