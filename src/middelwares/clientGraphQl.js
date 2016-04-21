import axios from 'axios';


export default function (store){
    let dispatch = store.dispatch;
    return function(next){

        return function(action){
            if(action.graphQl){
                return axios.post(`http://localhost:4000/graphql`, action.payload).then((data) => {

                    return dispatch(Object.assign(
                        {},
                        {
                            type: action.type,
                            payload: data
                        }
                    ));
                });

            } else {
                next(action);
            }
        }
    }
}