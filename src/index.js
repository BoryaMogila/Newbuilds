import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';


import clientGraphQl from './middleware/clientGraphQl'
import routes from './routes';
import reducers from './reducers';

const initialState = window.init;
const store = createStore(
    reducers,
    initialState,
    applyMiddleware(clientGraphQl, promise)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.querySelector('#conteiner'));