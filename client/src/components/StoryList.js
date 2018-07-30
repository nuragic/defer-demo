import React from 'react';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import RawResponse from './RawResponse';
import { NewsFeed } from './NewsFeed';
import { LoaderLarge } from './Loaders';

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

const StoryList = () => (
    <div className="demo-container row">
      <div className="column">
        <Query query={queryWithDefer} errorPolicy="all">
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
);

export default StoryList;
