import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { CharacterCard } from './Components';

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

const fragments = `fragment BasicInfo on Character {
  id
  name @defer
}`;

const deferredQueryString = `query DeferredQuery {
    human(id: "1000") {
      ...BasicInfo
      friends @defer {
        ...BasicInfo
      }
      weapon @defer {
        name 
        strength @defer
      }
      soulmate @defer {
        ...BasicInfo
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

const query = gql`
  ${deferredQueryString}
  ${fragments}
`;

const App = () => (
  <ApolloProvider client={client}>
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <h2>Apollo @defer Support Demo 🚀</h2>
      <h3>Query</h3>
      <pre>{deferredQueryString}</pre>
      <pre>{fragments}</pre>
      <hr />
      <h3>Response</h3>
      <Query query={query} errorPolicy="all">
        {/* 
          A new property loadingState is exposed on the Query component, 
          that contains field level loading states. This will be undefined
          if your query does not contain @defer.
        */}
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
