const { ApolloServer } = require('apollo-server');

const { StarWarsSchema } = require('./starWarsSchema');

const server = new ApolloServer({
  schema: StarWarsSchema
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
