const axios = require('axios');

const baseurl = "https://api.github.com/";
const auth = '?client_id=28ddb00e958e20e80330&client_secret=f2604eaafb3dc9afca773c76f8e0e84bb9591363';
const numResults = '&per_page=3';

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


async function userReducer(user) {
    const result = await axios(user.url + auth);
    const detailedUser = result.data;
    return {
        id: detailedUser.id || -1,
        login: detailedUser.login || 'not found',
        email: detailedUser.email,
        html_url: detailedUser.html_url,
        company: detailedUser.company,
        blog: detailedUser.blog,
        followers: detailedUser.followers,
        following: detailedUser.followers,
        avatar_url: detailedUser.avatar_url,
        bio: detailedUser.bio || '-',
        hireable: detailedUser.hireable,
        public_gists: detailedUser.public_gists,
        location:detailedUser.location,
        public_repos:detailedUser.public_repos,
        name:detailedUser.name
    };
}

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(DeveloperType),
            async resolve(parent, args) {
                const result = await axios(baseurl + "users" + auth + numResults);
                return result.data.map(user => userReducer(user));
                
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});