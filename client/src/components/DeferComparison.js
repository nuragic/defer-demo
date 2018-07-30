import React from 'react';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import { NewsFeed } from './NewsFeed';
import { LoaderLarge } from './Loaders';
import RawResponse from './RawResponse';

/**
 * The code example below shows just how easy it is to add
 * @defer into an existing query - and you can preview
 * its results side by side. Feel free to try adding @defer
 * to different fields to see its effect on loading time.
 */

const fragments = gql`
  fragment StoryDetail on Story {
    id
    title
    text @defer
    comments @defer {
      id
      text
    }
  }
`;

const query = gql`
  query NewsFeed {
    newsFeed {
      stories {
        id
        title
        text
        comments {
          id
          text
        }
      }
      recommendedForYou {
        story {
          id
          title
          text
          comments {
            id
            text
          }
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

const DeferComparison = () => (
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
            if (error) return <RawResponse error={error} />;
            return (
              <NewsFeed
                newsFeed={data.newsFeed}
                loadingState={loadingState && loadingState.newsFeed}
              />
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
            if (error) return <RawResponse error={error} />;
            return (
              <NewsFeed
                newsFeed={data.newsFeed}
                loadingState={loadingState && loadingState.newsFeed}
              />
            );
          }}
        </Query>
      </div>
    </div>
  </div>
);

export default DeferComparison;
