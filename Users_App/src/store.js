import { createStore, applyMiddleware } from 'redux';
import  thunkMiddleware  from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createRootReducer } from './Reducers/rootReducer'
import { routerMiddleware } from 'react-router-redux'

function configureMiddlewares ({ history }) {
    const middlewares = [thunkMiddleware, routerMiddleware(history)]
    if (process.env.NODE_ENV === 'develop') {
        middlewares.push(createLogger())
    }
    return middlewares;
}

function configureStore (config) {
    const reducers = createRootReducer(config.history)
    const middlewares = configureMiddlewares(config);
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const composedEnhancers = composeWithDevTools(middlewareEnhancer);
    const store = createStore(reducers, composedEnhancers);
    return store
}

export default configureStore