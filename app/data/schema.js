import query from 'mysql-query-promise';

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
            },
            tableName: {
                type: GraphQLString,
                resolve(city){
                    return city.tableName;
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
                    return newbuild.newbuildId;
                }
            },
            name: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild.name;
                }
            },
            contact: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild.contact;
                }
            },
            lunLink: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild.lunLink;
                }
            },
            date: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild.date;
                }
            },
            checked: {
                type: GraphQLInt,
                resolve(newbuild){
                    return newbuild.checked;
                }
            },
            coment: {
                type: GraphQLString,
                resolve(newbuild){
                    return newbuild.coment;
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
                },
                tableName: {
                    name: 'tableName',
                    type: GraphQLString
                }
            },
            resolve(_, args){
                let qs = `UPDATE ${args.tableName} SET `;
                qs += ` checked=${Number(args.checked)}, `;
                qs += ` coment='${args.coment}' `;
                qs += ` WHERE newbuildId=LAST_INSERT_ID(${Number(args.newbuildId)});`;
                return query(qs, [], 'master').then((res) => {
                    return {
                        newbuildId: res.insertId,
                        checked: Number(args.checked),
                        coment: args.coment
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

                    let qs = `SELECT * FROM lun_base.newbuildCities`;
                    return query(qs, [], 'master');
                }
            },
            newbuilds: {
                type: new GraphQLList(Newbuild),
                args: {
                    tableName: {
                        type: GraphQLString
                    },
                    limit: {
                        type: GraphQLInt
                    },
                    offset: {
                        type: GraphQLInt
                    },
                    ids: {type: new GraphQLList(GraphQLInt)}
                },
                resolve(root, args){
                    let where = ` WHERE `;
                    where += args.ids ? `id IN (${args.ids}) `: ``;

                    let limit = args.limit ? ` LIMIT ${Number(args.limit)} ` : ``;

                    let offset = args.offset ? ` OFFSET ${Number(args.offset)} ` : ``;

                    let qs = `SELECT a.newbuildId, a.name, a.contact, a.lunLink, a.checked, a.coment
                    FROM lun_base.${args.tableName} a ${limit} ${offset}`;
                    query(qs, [], 'master').then((data) => {
                        console.log(data.length);
                    })
                    return query(qs, [], 'master');
                }
            },
            count: {
                type: GraphQLString,
                args:{
                    tableName: {type: GraphQLString}
                },
                resolve(_, args){
                    let qs = `SELECT count(*) as count from lun_base.${args.tableName}`;
                    return query(qs, [], 'master').then((data) => data[0].count);
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

