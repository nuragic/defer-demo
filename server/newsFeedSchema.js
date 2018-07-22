const { gql } = require('apollo-server');

const typeDefs = gql`
  type NewsFeed {
    stories: [Story]
    recommendedForYou: [RecommendedContent]
  }

  type Story {
    id: ID!
    text: String!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
  }

  type RecommendedContent {
    story: Story!
    matchScore: Int!
    friendsWhoLiked: [String]!
  }

  type Query {
    newsFeed: NewsFeed
  }
`;

const delay = (result, delayMs) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(result);
    }, delayMs);
  });

const story1 = {
  id: 1,
  text: 'Breaking news: Apollo Project lands first human on the moon',
  comments: [1001, 1002],
};

const story2 = {
  id: 2,
  text: "China's super-sized space plans may involve help from Russia",
  comments: [1003, 1002],
};

const story3 = {
  id: 3,
  text: "Astronauts' snapshots from space light up the Twitterverse",
  comments: [1004, 1001],
};

const story4 = {
  id: 4,
  text: 'Young Star May Be Devouring a Planet',
  comments: [1001, 1002],
};

const story5 = {
  id: 5,
  text: 'Watch Astronauts Set Foot on the Moon in Historic NASA Footage',
  comments: [1003, 1004],
};

const rec1 = {
  story: story4,
  matchScore: 89,
};

const rec2 = {
  story: story5,
  matchScore: 92,
};

const commentData = {
  '1001': {
    id: 1001,
    text: 'Wow! Incredible stuff!',
  },
  '1002': {
    id: 1002,
    text: 'This is awesome!',
  },
  '1003': {
    id: 1003,
    text: 'Fake news!',
  },
  '1004': {
    id: 1004,
    text: 'Unbelievable!',
  },
};

function getNewsFeedStories() {
  return delay([story1, story2, story3], 500);
}

function getRecommendedContent() {
  return delay([rec1, rec2], 2000);
}

function getComment(id) {
  return commentData[id];
}

const resolvers = {
  Query: {
    newsFeed: () => delay({
      stories: getNewsFeedStories(),
      recommendedForYou: getRecommendedContent(),
    }, 700)
  },
  Story: {
    comments: parent =>
      delay(parent.comments.map(id => getComment(id)), 1000)
  },
};

module.exports = { typeDefs, resolvers };
