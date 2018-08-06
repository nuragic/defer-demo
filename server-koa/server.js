const Koa = require('koa');
const { ApolloServer } = require('apollo-server-koa');
const { typeDefs, resolvers } = require('./newsFeedSchema');
const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
