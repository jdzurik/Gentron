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
var react_redux_1 = require("react-redux");
var App_1 = require("./components/App");
var configureStore_1 = require("./store/configureStore");
var electronMenu_1 = require("./electronMenu");
var syncHistoryWithStore = function (store, history) {
    var routing = store.getState().routing;
    if (routing && routing.location) {
        history.replace(routing.location);
    }
};
electronMenu_1.default();
var history = history_1.createMemoryHistory();
var initialState = (window.initialReduxState) || new Gentron_Library_1.Gentron();
var store = configureStore_1.default(history, initialState);
syncHistoryWithStore(store, history);
var root = document.createElement("div");
var rootId = "appRoot" + Date.now();
root.id = rootId;
root.className = "h-100 w-100";
document.body.appendChild(root);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.default, { history: history })), document.getElementById(rootId));
