
import {graphql} from 'graphql';
import schema from '../data/schema';


export default function fetchComponentData (
    dispatch,
    components,
    params,
    query
){
    let needs = [];
    for(let component of components){
        component = component.WrappedComponent ? component.WrappedComponent : component;
        if(component.need){
            needs.push(...component.need);
        }
    }
    let promises = [];
    for(let need of needs){
        promises.push(graphql(schema, need.payload.query).then((data) => {
            dispatch(Object.assign({}, {
                type: need.type,
                payload: {data}
            }));
        }));
    }
    return Promise.all(promises)
}