"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var connected_react_router_1 = require("connected-react-router");
var redux_thunk_1 = require("redux-thunk");
var reducers_1 = require("../reducers");
function configureStore(history, initialState) {
    var windowIfDefined = typeof window === 'undefined' ? null : window;
    var devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    var middleWare = redux_1.applyMiddleware(redux_thunk_1.default, connected_react_router_1.routerMiddleware(history));
    var createStoreWithMiddleware = redux_1.compose(middleWare, devToolsExtension
        ? devToolsExtension()
        : function (next) { return next; })(redux_1.createStore);
    var allReducers = buildRootReducer(reducers_1.reducers);
    var store = redux_1.createStore(connected_react_router_1.connectRouter(history)(allReducers), initialState, redux_1.compose(redux_1.applyMiddleware(connected_react_router_1.routerMiddleware(history))));
    return store;
}
exports.default = configureStore;
function buildRootReducer(allReducers) {
    return redux_1.combineReducers(Object.assign({}, allReducers));
}
