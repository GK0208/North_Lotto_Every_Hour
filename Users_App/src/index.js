import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  configureStore   from './store'
import history from './history';
import { ConnectedRouter } from 'connected-react-router'
import './index.css';
import App from './App';


export const store = configureStore({ history });

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history = { history }>
        <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
