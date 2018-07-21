import React from 'react';
import { LoaderLarge, LoaderSmall } from './Loaders';
import { Trail } from 'react-spring';

/**
 * If the query is deferred, an additional prop loadingState will be passed in
 * which gives us field level loading status. There is some additional
 * boilerplate to handle 3 different states now: "loading", "ready", and
 * "ready but null". Any thoughts around how to simplify this API will be
 * much appreciated!
 */

const Story = ({ story, loadingState }) => {
  if (loadingState) {
    // This component will check loadingState if it is passed it
    return (
      <div className="story">
        <div className="text">{story.text}</div>
        <div className="comments">
          {loadingState.comments ? (
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
    );
  } else {
    // This component will not check loadingState. If you do not need to
    // distinguish between "null" and "loading" states, the code can be less
    // verbose.
    return (
      <div className="story">
        <div className="text">{story.text}</div>
        <div className="comments">
          {story.comments
            ? story.comments.map(comment => (
                <div className="comment" key={comment.id}>
                  > {comment.text}
                </div>
              ))
            : 'No comments'}
        </div>
      </div>
    );
  }
};

export const NewsFeed = ({ newsFeed, loadingState }) => {
  if (loadingState) {
    // This component will check loadingState if it is passed it
    return (
      <div className="newsFeed">
        <div className="stories">
          <div className="header">Your daily news</div>
          {loadingState.stories ? (
            newsFeed.stories ? (
              <Trail
                keys={newsFeed.stories.map(story => story.id)}
                from={{ opacity: 0, transform: 'translateY(-10px)' }}
                to={{ opacity: 1, transform: 'translateY(0)' }}
              >
                {newsFeed.stories.map((story, index) => styles => (
                  <div style={styles}>
                    <Story
                      key={story.id}
                      story={story}
                      loadingState={loadingState.stories[index]}
                    />
                  </div>
                ))}
              </Trail>
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
              <Trail
                keys={newsFeed.recommendedForYou.map(
                  recommended => recommended.story.id
                )}
                from={{ opacity: 0, transform: 'translateY(-10px)' }}
                to={{ opacity: 1, transform: 'translateY(0)' }}
              >
                {newsFeed.recommendedForYou.map(
                  (recommended, index) => styles => (
                    <div style={styles}>
                      <Story
                        key={recommended.story.id}
                        story={recommended.story}
                        loadingState={
                          loadingState.recommendedForYou[index].story
                        }
                      />
                    </div>
                  )
                )}
              </Trail>
            ) : (
              'No recommended content'
            )
          ) : (
            <LoaderLarge />
          )}
        </div>
      </div>
    );
  } else {
    // This component will not check loadingState. If you do not need to
    // distinguish between "null" and "loading" states, the code can be less
    // verbose.
    return (
      <div className="newsFeed">
        <div className="stories">
          <div className="header">Your daily news</div>
          {newsFeed.stories ? (
            <Trail
              keys={newsFeed.stories.map(story => story.id)}
              from={{ opacity: 0, transform: 'translateY(-10px)' }}
              to={{ opacity: 1, transform: 'translateY(0)' }}
            >
              {newsFeed.stories.map(story => styles => (
                <div style={styles}>
                  <Story style={styles} story={story} />
                </div>
              ))}
            </Trail>
          ) : (
            'No stories to show'
          )}
        </div>
        <div className="recommended">
          <div className="header">Recommended for you</div>
          {newsFeed.recommendedForYou ? (
            <Trail
              keys={newsFeed.recommendedForYou.map(
                recommended => recommended.story.id
              )}
              from={{ opacity: 0, transform: 'translateY(-10px)' }}
              to={{ opacity: 1, transform: 'translateY(0)' }}
            >
              {newsFeed.recommendedForYou.map(recommended => styles => (
                <div style={styles}>
                  <Story key={recommended.story.id} story={recommended.story} />
                </div>
              ))}
            </Trail>
          ) : (
            'No recommended content'
          )}
        </div>
      </div>
    );
  }
};
