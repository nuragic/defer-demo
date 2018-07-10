import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloProvider, Query, Subscription } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';
import DeferLink from './DeferLink';

const GRAPHQL_ENDPOINT = 'ws://localhost:4000/subs';

const subClient = new SubscriptionClient(GRAPHQL_ENDPOINT, {
  reconnect: true,
});

const consoleLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(data => {
    // console.log(`data: ${JSON.stringify(data, null, 2)}`);
    return data;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    consoleLink,
    new DeferLink(),
    new WebSocketLink(subClient),
  ]),
  cache: new InMemoryCache(),
});

const query = gql`
  query DeferredQuery {
    hero {
      id
      name
      friends @defer {
        id
        name @defer
      }
    }
  }
`;

const App = () => (
  <ApolloProvider client={client}>
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <h2>Upcoming: Apollo @defer support 🚀</h2>
      <h3>Query</h3>
      <pre>{`
query DeferredQuery {
  hero {
    id
    name
    friends @defer {
      id
      name @defer
    }
  }
}`}</pre>
      <hr />
      <h3>Response</h3>
      <Subscription subscription={query}>
        {({ loading, error, data }) => {
          if (loading) return 'loading...';
          if (error) {
            return (
              <pre style={{ color: 'red' }}>
                {JSON.stringify(error, null, 2)}
              </pre>
            );
          }
          return <pre>{JSON.stringify(data, null, 2)}</pre>;
        }}
      </Subscription>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
