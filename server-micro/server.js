const { ApolloServer } = require('apollo-server-micro');
const cors = require('micro-cors')();

const { typeDefs, resolvers } = require('./newsFeedSchema');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = cors(apolloServer.createHandler());