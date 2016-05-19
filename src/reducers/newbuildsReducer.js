import * as actionsTypes from '../actions/actionsTypes';

export default function(state = [], action){
    switch (action.type){
        case actionsTypes.GET_NEWBUILDS:

            if(action.payload.query){
                return state
            }
            let newbuilds = action.payload.data.data.newbuilds;
            newbuilds = newbuilds.map((newbuild) => {
                return {
                    ...newbuild,
                    changed: 0,
                    coment: (!newbuild.coment  ? '' : newbuild.coment)
                }
            });
            return [...newbuilds];
        case actionsTypes.SAVE_NEWBUILD:

            let chengedNewbuild = {
                newbuildId: action.payload.data.data.updateNewbuild.newbuildId,
                checked: action.payload.data.data.updateNewbuild.checked,
                coment: action.payload.data.data.updateNewbuild.coment,
                changed: 0
            };
            const ind = state.findIndex((item) => item.newbuildId === chengedNewbuild.newbuildId);
            return [
                ...state.slice(0, ind),
                Object.assign({},state[ind], chengedNewbuild),
                ...state.slice(ind + 1)
            ];
        default:
            return state;
    }
}