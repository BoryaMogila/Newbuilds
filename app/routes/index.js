import Router from 'koa-router';
import reactApp from '../helpers/reactApp'


let router = Router();

router.get('*', reactApp);
export default router;