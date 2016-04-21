import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, memoryHistory, createMemoryHistory, match, RouterContext } from 'react-router';
import promise from 'redux-promise';
import clientGraphQl from './clientGraphQl';
import fetchComponentData from './fetchComponentData';
//import applyMiddleware from 'redux-wait';


import routes from '../../src/routes';
import reducers from '../../src/reducers';

export default function * (next) {

    const location = this.originalUrl;
    if(location == '/favicon.ico') return;
    const createStoreWithMiddleware = applyMiddleware()(createStore);
    let store = createStoreWithMiddleware(reducers);

    let renderWait;
    let renderHtml;
    match({ routes, location }, function (error, redirectLocation, renderProps){
        renderWait = fetchComponentData(
            store.dispatch,
            renderProps.components,
            renderProps.params,
            renderProps.location.query
        );

        renderHtml = function(){
            let html = ReactDomServer.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );
            return html;
        }


    });
    yield renderWait;
    let html = renderHtml();
    yield this.render('index', {html, state: JSON.stringify(store.getState())});

}