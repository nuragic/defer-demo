import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { LoaderSmall, LoaderLarge } from './Loaders';
import RawResponse from './RawResponse';

const query = gql`
  query StoryDetail($id: ID!) {
    story(id: $id) {
      id
      title
      text @defer
      comments @defer {
        id
        text
      }
    }
  }
`;

const StoryDetail = ({ match }) => (
  <div className="app-container">
    <Link className="nav" to="/">👈 Back</Link>
    <Query query={query} variables={{ id: match.params.id }}>
      {({ loading, error, data, loadingState, networkStatus }) => {
        if (loading) return <LoaderLarge />;
        if (error) return <RawResponse error={error} />;
        const story = data.story;
        const ls = loadingState.story;
        return (
          <Link to={`/story/${story.id}`}>
            <div className="story">
              <div className="title">{story.title}</div>
              <div className="text">{ls.text ? story.text : '...'}</div>
              <div className="comments">
                {ls.comments ? (
                  story.comments ? (
                    story.comments.map(comment => (
                      <div className="comment" key={comment.id}>
                        > {comment.text}
                      </div>
                    ))
                  ) : (
                    'No comments'
                  )
                ) : (
                  <LoaderSmall />
                )}
              </div>
            </div>
          </Link>
        );
      }}
    </Query>
  </div>
);

export default StoryDetail;
