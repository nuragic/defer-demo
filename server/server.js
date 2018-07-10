const { ApolloServer } = require('apollo-server');

const { StarWarsSchema } = require('./starWarsSchema');

const server = new ApolloServer({
  schema: StarWarsSchema,
  subscriptions: {
    path: '/subs',
    keepAlive: 6000,
    onConnect: (connectionParams, webSocket) => {
      console.log('connected');
    },
    onDisconnect: () => {
      console.log('disconnected');
    },
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
