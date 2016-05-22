import Router from 'koa-router';
import reactApp from '../controllers/reactAppController';
import graphqlHTTP from 'koa-graphql';
import convert from 'koa-convert';
import schema from '../data/schema';


let router = Router();
router.post('/graphql', convert(graphqlHTTP({ schema: schema, graphiql: true})));
router.get('*', reactApp);
export default router;