import React from 'react';
import { Route, IndexRoute} from 'react-router';

import Wrapper from './components/Wrapper';
import Rend from './components/App';
export default(
    <Route path="/" component={Rend} >
        <IndexRoute component={Wrapper} />
    </Route>

);