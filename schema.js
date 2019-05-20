const axios = require('axios');
const GitHub = require('./GitHub');
const baseurl = "https://api.github.com/";
const auth = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;


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
        // deprecated - no need to get this info... 
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