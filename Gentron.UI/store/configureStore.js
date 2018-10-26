"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connected_react_router_1 = require("connected-react-router");
const redux_1 = require("redux");
const reducers_1 = require("../reducers");
const redux_thunk_1 = require("redux-thunk");
function configureStore(history, initialState) {
    const windowIfDefined = typeof window === 'undefined' ? null : window;
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__;
    const middleWare = redux_1.applyMiddleware(redux_thunk_1.default, connected_react_router_1.routerMiddleware(history));
    const createStoreWithMiddleware = redux_1.compose(middleWare, devToolsExtension
        ? devToolsExtension()
        : (next) => next)(redux_1.createStore);
    const allReducers = buildRootReducer(reducers_1.reducers);
    const store = redux_1.createStore(connected_react_router_1.connectRouter(history)(allReducers), initialState, redux_1.compose(redux_1.applyMiddleware(connected_react_router_1.routerMiddleware(history))));
    return store;
}
exports.default = configureStore;
function buildRootReducer(allReducers) {
    return redux_1.combineReducers(Object.assign({}, allReducers));
}
