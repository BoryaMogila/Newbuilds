import query from 'mysql-query-promise';
import { Client } from 'elasticsearch';

const client = new Client({
    host: 'localhost:9200'
})

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    introspectionQuery,
} from 'graphql';

let City = new GraphQLObjectType({
    name: 'City',
    fields: () => {
        return {
            cityName: {
                type: GraphQLString,
                resolve(city){
                    return city.key;
                }
            }
        }
    }
});

let Newbuild = new GraphQLObjectType({
    name: 'Newbuild',
    fields: () => {
        return {
            newbuildId: {
                type: GraphQLInt,
                resolve(newbuild){
                    return newbuild._id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild._source.name;
                }
            },
            contact: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild._source.contact;
                }
            },
            lunLink: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild._source.lunLink;
                }
            },
            date: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild._source.date;
                }
            },
            checked: {
                type: GraphQLInt,
                resolve(newbuild){
                    return newbuild._source.checked;
                }
            },
            coment: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild._source.coment;
                }
            },
            cityName: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild._source.cityName;
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        updateNewbuild: {
            type: Newbuild,
            args: {
                checked: {
                    name: 'checked',
                    type: GraphQLString
                },
                coment: {
                    name: 'coment',
                    type: GraphQLString
                },
                newbuildId: {
                    name: 'newbuildId',
                    type: GraphQLString
                }
            },
            resolve(_, args){
                return client.update({
                    index: 'lun',
                    type: 'newbuilds',
                    id: args.newbuildId,
                    body: {
                        doc: {
                            checked: args.checked,
                            coment: args.coment
                        }
                    }
                }).then((res) => {
                    return {
                        _id: res._id,
                        _source:{
                            checked: Number(args.checked),
                            coment: args.coment
                        }
                    }
                })
            }
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () =>{
        return {
            cities: {
                type: new GraphQLList(City),
                resolve(root, args){
                    return client.search({
                        index: 'lun',
                        type: 'newbuilds',
                        body: {
                            "aggs": {
                                "cityName": {
                                    "terms": {
                                        "field": "city",
                                        "size": 0,
                                        "order" : { "_term" : "asc" }
                                    }
                                }
                            }
                        }
                    }).then((res)=>{
                        return res.aggregations.cityName.buckets;
                    });
                }
            },
            newbuilds: {
                type: new GraphQLList(Newbuild),
                args: {
                    cityName: {
                        type: GraphQLString
                    },
                    limit: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    },
                    checked: {
                        type: GraphQLString
                    }
                },
                resolve(root, args){
                    let query = {},
                        must  = [];
                    if(args.cityName){
                        must.push({
                            match_phrase: {
                                cityName: args.cityName
                            }
                        });
                    }
                    if(args.checked ){
                        must.push({
                            match_phrase: {
                                checked: args.checked
                            }
                        });
                    }
                    if(must.length){
                        query = {
                                bool: {
                                    must
                                }
                            };
                    } else {
                        query = {
                                match_all: {}
                            };
                    }

                    return client.search({
                        index: 'lun',
                        type: 'newbuilds',
                        body: {
                            query,
                            size: args.limit ? args.limit : 25,
                            from: args.offset ? args.offset : 0
                        }
                    }).then((res)=>{

                        return res.hits.hits;
                    });
                }
            },
            count: {
                type: GraphQLString,
                args:{
                    cityName: {
                        type: GraphQLString
                    },
                    checked: {
                        type: GraphQLString
                    }
                },
                resolve(_, args){
                    let query = {},
                        must  = [];
                    if(args.cityName){
                        must.push({
                            match_phrase: {
                                cityName: args.cityName
                            }
                        });
                    }
                    if(args.checked){
                        must.push({
                            match_phrase: {
                                checked: args.checked
                            }
                        });
                    }
                    if(must.length){
                        query = {
                            bool: {
                                must
                            }
                        };
                    } else {
                        query = {
                            match_all: {}
                        };
                    }

                    return client.search({
                        index: 'lun',
                        type: 'newbuilds',
                        body: {
                            query,
                            size: 0
                        }
                    }).then((res)=>{

                        return res.hits.total;
                    });
                }
            }

        }
    }
});


let schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
export default schema;

