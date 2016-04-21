import {CHANGE_CITY} from '../actions/actionsTypes';

const initialState = {
    "cityId": 1,
    "cityName": "все новостройки киева",
    "tableName": "vse_novostroyki_kieva"
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