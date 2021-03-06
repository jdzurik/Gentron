﻿import { IGentron } from "../../Gentron.Library";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancerStoreCreator, ReducersMapObject, StoreEnhancer, Store } from 'redux';
import { History } from 'history';
import { appReducers, rootReducer } from "../reducers";
import thunk from 'redux-thunk';
import { NonFunctionProperties } from "../../Gentron.Library/types";
import { AnyAction } from "redux";

export default function configureStore(history: History, initialState: IGentron): Store<IGentron, AnyAction> & { dispatch: {} } {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;

    // If devTools is installed, connect to it
    const devToolsExtension: () => StoreEnhancer = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
    const middleWare: StoreEnhancer<{ dispatch: {}; }, {}> = applyMiddleware(thunk, routerMiddleware(history));
    const createStoreWithMiddleware = compose(middleWare,
        devToolsExtension
            ? devToolsExtension()
            : (next: StoreEnhancerStoreCreator) => next)(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    //const allReducers = buildRootReducer(appReducers);

    const store = createStore(
        connectRouter(history)(rootReducer), // new root reducer with router state
        initialState,
        compose(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            ),
        ),
    )

    return store as Store<IGentron, AnyAction> & { dispatch: {} };
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<IGentron>((<any>Object).assign({}, allReducers));
}