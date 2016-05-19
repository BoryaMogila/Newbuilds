import {CHANGE_CITY} from '../actions/actionsTypes';

const initialState = {
    "cityId": 0,
    "cityName": "все новостройки винницы"
};
export default function(state = initialState, action){
    switch (action.type){
        case CHANGE_CITY:
            const city = action.payload;
            return {...city};

        default:
            return state;
    }
}