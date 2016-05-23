import React from 'react';
import ReactDomServer from '../../node_modules/react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, match, RouterContext } from 'react-router';
import fetchComponentData from './../helpers/fetchComponentData';

import routes from '../../src/routes';
import reducers from '../../src/reducers';

export default async function (ctx) {
    if(ctx.request.path !== '/'){
        ctx.redirect('/');
        ctx.status = 302;
        return;
    }
    const location = ctx.originalUrl;
    if(location == '/favicon.ico') return;
    const createStoreWithMiddleware = applyMiddleware()(createStore);
    let store = createStoreWithMiddleware(reducers);

    let renderWait;
    let renderHtml;
    match({ routes, location },  function (error, redirectLocation, renderProps){
        renderWait = fetchComponentData(
            store.dispatch,
            renderProps.components,
            renderProps.params,
            renderProps.location.query
        ).then(() => {
            return ReactDomServer.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );
        });

    });
    let html = await renderWait;

    await ctx.render('index', {html, state: JSON.stringify(store.getState())});

}