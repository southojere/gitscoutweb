const axios = require('axios');
const GitHub = require('./GitHub');
const baseurl = "https://api.github.com/";
const auth = '?client_id=28ddb00e958e20e80330&client_secret=f2604eaafb3dc9afca773c76f8e0e84bb9591363';
const numResults = '&per_page=2';

const GitHubDataSource = new GitHub();

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');


const DeveloperType = new GraphQLObjectType({
    name: 'Developer',
    fields: () => ({
        id: {type: GraphQLInt},
        login: { type: GraphQLString },
        avatar_url: { type: GraphQLString },
        html_url: { type: GraphQLString },
        followers: {type: GraphQLInt},
        following: {type: GraphQLInt},
        email: { type: GraphQLString },
        blog: { type: GraphQLString },
        company: { type: GraphQLString },
        bio: { type: GraphQLString },
        hireable: {type: GraphQLBoolean},
        public_gists: {type: GraphQLInt},
        location: { type: GraphQLString },
        public_repos: {type: GraphQLInt},
        name: { type: GraphQLString }
    })
});


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(DeveloperType),
            async resolve(parent, args) {
                const result = await GitHubDataSource.getAllUsers();
                return result;
                
            }
        },
        usersInLocation: {
            type: new GraphQLList(DeveloperType),
            args: {
                location: { type: GraphQLString },
                sortBy: { type: GraphQLString }
            },
            async resolve(parent, args) {
                console.log('resolving :'+args.location);
                const result = await GitHubDataSource.getUsersAtLocation({location: args.location,sortBy:args.sortBy});
                return Promise.all(result);
                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});