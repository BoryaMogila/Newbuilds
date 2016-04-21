import { combineReducers } from 'redux';

import CitiesReducer from './citiesReducer';
import CityReducer  from './cityReducer';
import NewbuildsReducer from './newbuildsReducer';
import CountReducer from './countReducer';

const rootReducer = combineReducers({
    cities: CitiesReducer,
    city: CityReducer,
    newbuilds: NewbuildsReducer,
    count: CountReducer
});

export default rootReducer;