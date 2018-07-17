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
import { CharacterCard } from './Components';

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

const deferredQueryString = `query DeferredQuery {
    human(id: "1000") {
      id
      name @defer
      friends @defer {
        id
        name @defer
      }
      weapon @defer {
        name 
        strength @defer
      }
      soulmate @defer {
        name
        ... on Human {
          weapon {
            name
            strength @defer
          }
        }
      }
    }
  }
`;

const queryString = `query NormalQuery {
  hero {
    id
    name
    friends {
      name
    }
  }
}`;

const query = gql`
  ${deferredQueryString}
`;

const App = () => (
  <ApolloProvider client={client}>
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <h2>Apollo @defer Support Demo 🚀</h2>
      <h3>Query</h3>
      <pre>{deferredQueryString}</pre>
      <hr />
      <h3>Response</h3>
      <Query query={query} errorPolicy="all">
        {({ loading, error, data, loadingState }) => {
          console.log(`loadingState: ${JSON.stringify(loadingState, null, 2)}`);
          if (loading) return 'loading...';
          return (
            <div>
              {data ? (
                <CharacterCard
                  loadingState={loadingState.human}
                  character={data.human}
                />
              ) : null}
              {data ? (
                <pre key="data">{JSON.stringify(data, null, 2)}</pre>
              ) : null}
              {error ? (
                <pre key="error" style={{ color: 'red' }}>
                  {JSON.stringify(error, null, 2)}
                </pre>
              ) : null}
            </div>
          );
        }}
      </Query>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
