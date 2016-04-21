import * as actionTypes from '../actions/actionsTypes';

export default function(state = {}, action){
    switch (action.type){
        case actionTypes.GET_COUNT:
            return {
                pagesCount: Math.ceil(action.payload.data.data.count / 25),
                page: 1
            };
        case actionTypes.SELECT_PAGE:
            const page = action.payload;
            return {
                ...state, page
            };
        default:
            return state;
    }
}