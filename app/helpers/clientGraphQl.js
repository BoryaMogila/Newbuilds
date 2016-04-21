
import {graphql} from 'graphql';
import schema from '../data/schema';

let passIn = [];
let passOut = [];

export default function (store){

    return function(next){

        return function(action){
            //console.log(action);
            if(action.graphQl){
                if(passIn.indexOf(action.type) == -1){
                    passIn.push(action.type);
                } else {
                    passIn.splice(passIn.indexOf(action.type), 1);
                    return;
                }
                graphql(schema,action.payload.query).then((data) => {
                    let res = {data};
                    return store.dispatch(
                        Object.assign(
                            {},
                            {
                                type: action.type,
                                payload: res
                            }
                        )
                    )

                });

            } else {
                console.log('action',typeof action.payload.then != 'function');
                if((passOut.indexOf(action.type) == -1) && (typeof action.payload.then != 'function')){
                    passOut.push(action.type);
                } else {
                    passOut.splice(passOut.indexOf(action.type), 1);
                    return;
                }console.log('action',action);
                return next(action);
            }
        }
    }
}