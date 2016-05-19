import Router from 'koa-router';
import reactApp from '../controllers/reactAppController'


let router = Router();

router.get('*', reactApp);
export default router;