import koa from 'koa';
import config from 'config';
import serve from 'koa-static';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import bodyparser from './helpers/bodyParser';
import render from './helpers/render';
import router from './helpers/router';
import schema from './data/schema';

let app = koa();

bodyparser(app);
render(app, config);
app.use(serve(__dirname + '/../public'));

app.use(mount('/graphql', graphqlHTTP({ schema: schema, graphiql: true})));

router(app);



app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});