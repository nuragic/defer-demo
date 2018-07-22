import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './index.css';
import { NewsFeed } from './components/NewsFeed';
import { LoaderLarge } from './components/Loaders';
const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

/**
 * The code example below shows just how easy it is to add
 * @defer into an existing query - and you can preview
 * its results side by side. Feel free to try adding @defer
 * to different fields to see its effect on loading time.
 */


const fragments = gql`
  fragment StoryDetail on Story {
    id
    text
    comments @defer {
      id
      text
    }
  }
`

const query = gql`
  ${fragments}
  query NewsFeed {
    newsFeed {
      stories {
        ...StoryDetail
      }
      recommendedForYou {
        story {
          ...StoryDetail
        }
        matchScore
      }
    }
  }
`;

const queryWithDefer = gql`
  ${fragments}
  query NewsFeed {
    newsFeed {
      stories {
        ...StoryDetail
      }
      recommendedForYou @defer {
        story {
          ...StoryDetail
        }
        matchScore
      }
    }
  }
`;

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <div className="demo-title">
        <span>🚀🚀🚀</span> Optimize page loads with @defer <span>🚀🚀🚀</span>
      </div>
      <div className="demo-container row">

        {/* Before using defer */}

        <div className="column">
          <div className="demo-subtitle">Without @defer</div>
          <Query query={query} errorPolicy="all">
            {({ loading, error, data, loadingState }) => {
              if (loading) return <LoaderLarge />;
              return (
                <div>
                  <NewsFeed
                    newsFeed={data.newsFeed}
                    loadingState={loadingState && loadingState.newsFeed}
                  />
                </div>
              );
            }}
          </Query>
        </div>

        {/* After using defer */}

        <div className="column">
          <div className="demo-subtitle">With @defer</div>
          <Query query={queryWithDefer} errorPolicy="all">
            {/* A new property loadingState is exposed on the Query component,
        that contains field level loading states. This will be undefined
        if your query does not contain @defer.
        */}

            {({ loading, error, data, loadingState }) => {
              if (loading) return <LoaderLarge />;
              return (
                <div>
                  <NewsFeed
                    newsFeed={data.newsFeed}
                    loadingState={loadingState && loadingState.newsFeed}
                  />
                </div>
              );
            }}
          </Query>
        </div>
      </div>
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
