import { IGentron } from "../../Gentron.Library";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createStore, applyMiddleware, compose, combineReducers, StoreEnhancerStoreCreator, ReducersMapObject, StoreEnhancer, Store } from 'redux';
import { History } from 'history';
import { reducers } from "../reducers";
import thunk from 'redux-thunk';
import { NonFunctionProperties } from "../../Gentron.Library/types";

export default function configureStore(history: History, initialState: NonFunctionProperties<IGentron>) {
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
    const allReducers = buildRootReducer(reducers);
    //const store1 = createStoreWithMiddleware(connectRouter(history)(allReducers), initialState) as Store<IGentron>;
    const store = createStore(
        connectRouter(history)(allReducers), // new root reducer with router state
        initialState,
        compose(
            applyMiddleware(
                thunk,
                routerMiddleware(history)
            ),
        ),
    )

    // Enable Webpack hot module replacement for reducers
    //if ((module as any).hot) {
    //    //(module as any).hot.accept();
    //    (module as any).hot.accept(['../reducers', '../index', '../components/Debug'], () => {
    //        const nextRootReducer = require('../reducers').default;
    //        console.log(nextRootReducer);
    //        store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
    //    });
    //}

    return store;
}

function buildRootReducer(allReducers: ReducersMapObject) {
    return combineReducers<IGentron>((<any>Object).assign({}, allReducers));
}