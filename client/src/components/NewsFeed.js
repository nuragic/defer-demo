import React from 'react';
import { LoaderLarge, LoaderSmall } from './Loaders';

const Story = ({ story }) => (
  <div className="story">
    <div className="text">{story.text}</div>
    <div className="comments">
      {story.comments
        ? story.comments.map(comment => (
            <div className="comment" key={comment.id}>> {comment.text}</div>
          ))
        : 'No comments'}
    </div>
  </div>
);

export const NewsFeed = ({ newsFeed }) => {
  return (
    <div className="newsFeed">
      <div className="stories">
        <div className="header">Your daily news</div>
        {newsFeed.stories
          ? newsFeed.stories.map(story => (
              <Story key={story.id} story={story} />
            ))
          : 'No stories to show'}
      </div>
      <div className="recommended">
        <div className="header">Recommended for you</div>
        {newsFeed.recommendedForYou
          ? newsFeed.recommendedForYou.map(recommended => (
              <Story key={recommended.story.id} story={recommended.story} />
            ))
          : 'No recommended content'}
      </div>
    </div>
  );
};

/**
 * These components are the same as above, except that it takes loadingState as
 * a prop, which gives us field level loading status. There is some additional
 * boilerplate to handle 3 different states now: "loading", "ready", and
 * "ready but null". Any thoughts around how to simplify this API will be
 * much appreciated!
 */

const FastStory = ({ story, loadingState }) => (
  <div className="story">
    <div className="text">{story.text}</div>
    <div className="comments">
      {loadingState.comments ? (
        story.comments ? (
          story.comments.map(comment => (
            <div className="comment" key={comment.id}>> {comment.text}</div>
          ))
        ) : (
          'No comments'
        )
      ) : (
        <LoaderSmall />
      )}
    </div>
  </div>
);

export const FastNewsFeed = ({ newsFeed, loadingState }) => {
  return (
    <div className="newsFeed">
      <div className="stories">
        <div className="header">Your daily news</div>
        {loadingState.stories ? (
          newsFeed.stories ? (
            newsFeed.stories.map((story, index) => (
              <FastStory
                key={story.id}
                story={story}
                loadingState={loadingState.stories[index]}
              />
            ))
          ) : (
            'No stories to show'
          )
        ) : (
          <LoaderLarge />
        )}
      </div>
      <div className="recommended">
        <div className="header">Recommended for you</div>
        {loadingState.recommendedForYou ? (
          newsFeed.recommendedForYou ? (
            newsFeed.recommendedForYou.map((recommended, index) => (
              <FastStory
                key={recommended.story.id}
                story={recommended.story}
                loadingState={loadingState.recommendedForYou[index].story}
              />
            ))
          ) : (
            'No recommended content'
          )
        ) : (
          <LoaderLarge />
        )}
      </div>
    </div>
  );
};
