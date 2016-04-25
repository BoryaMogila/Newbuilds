import * as actionTypes from '../actions/actionsTypes';

export default function(state = {value: 'all'}, action){
    switch (action.type){
        case actionTypes.CHANGE_CHECKED:
            return {
                value: action.payload
            };
        default:
            return state;
    }
}