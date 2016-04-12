import query from 'mysql-query-promise';

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    introspectionQuery,
} from 'graphql';

let City = new GraphQLObjectType({
    name: 'City',
    fields: () => {
        return {
            cityId: {
                type: GraphQLInt,
                resolve(city){
                    return city.cityId;
                }
            },
            cityName: {
                type: GraphQLString,
                resolve(city){
                    return city.cityName;
                }
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () =>{
        return {
            Cities: {
                type: new GraphQLList(City),
                resolve(root, args){
                    let qs = `SELECT * FROM lun_base.newbuildCities`;
                    return query(qs, [], 'master');
                }
            }
        }
    }
});


let schema = new GraphQLSchema({
    query: Query
});
export default schema;

