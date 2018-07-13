import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider, Query } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

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
    createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  ]),
  cache: new InMemoryCache(),
});

const queryString = `query DeferredQuery {
    hero {
      id
      name
      secretBackstory
      friends @defer {
        id
        name @defer
        secretBackstory
      }
    }
  }
`;

const query = gql`
  ${queryString}
`;

const App = () => (
  <ApolloProvider client={client}>
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <h2>Upcoming: Apollo @defer support 🚀</h2>
      <h3>Query</h3>
      <pre>{queryString}</pre>
      <hr />
      <h3>Response</h3>
      <Query query={query} errorPolicy="ignore">
        {({ loading, error, data }) => {
          const divs = [];
          if (loading) return 'loading...';
          if (data) {
            divs.push(<pre key="data">{JSON.stringify(data, null, 2)}</pre>);
          }
          if (error) {
            divs.push(
              <pre key="error" style={{ color: 'red' }}>
                {JSON.stringify(error, null, 2)}
              </pre>
            );
          }
          return divs;
        }}
      </Query>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
