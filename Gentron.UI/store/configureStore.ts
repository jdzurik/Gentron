import { createStore, applyMiddleware, compose, combineReducers, Store, StoreEnhancerStoreCreator, ReducersMapObject, StoreEnhancer } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
//import { routerReducer, routerMiddleware } from 'react-router-redux';
import { ApplicationState } from "../types";
import { reducers } from "../reducers";
import { History } from 'history';

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;

    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => StoreEnhancer;
    const middleWare: StoreEnhancer<{ dispatch: {}; }, {}> = applyMiddleware(thunk, routerMiddleware(history));
    const createStoreWithMiddleware = compose(middleWare,
        devToolsExtension
            ? devToolsExtension() as StoreEnhancer
            : (next: StoreEnhancerStoreCreator) => next)(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    //const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;
    const store = createStore(
        connectRouter(history)(allReducers), // new root reducer with router state
        initialState,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            ),
        ),
    )

    // Enable Webpack hot module replacement for reducers
    //if (module.hot) {
    //    module.hot.accept('./store', () => {
    //        const nextRootReducer = require<typeof StoreModule>('./store');
    //        store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
    //    });
    //}

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<ApplicationState>((<any>Object).assign({}, allReducers));
}
