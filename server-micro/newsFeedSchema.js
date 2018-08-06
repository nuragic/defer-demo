const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  type NewsFeed {
    stories: [Story]
    recommendedForYou: [RecommendedContent]
  }

  type Story {
    id: ID!
    title: String!
    text: String
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
    story(id: ID!): Story
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
  title: 'Breaking news: Apollo Project lands first human on the moon',
  text: () =>
    delay(
      `Apollo 11 was the spaceflight that landed the first two people on the Moon. Mission commander Neil Armstrong and pilot Buzz Aldrin, both American, landed the lunar module Eagle on July 20, 1969, at 20:17 UTC. Armstrong became the first person to step onto the lunar surface six hours after landing on July 21 at 02:56:15 UTC; Aldrin joined him about 20 minutes later. They spent about two and a quarter hours together outside the spacecraft, and collected 47.5 pounds (21.5 kg) of lunar material to bring back to Earth. Michael Collins piloted the command module Columbia alone in lunar orbit while they were on the Moon's surface. Armstrong and Aldrin spent 21.5 hours on the lunar surface before rejoining Columbia in lunar orbit.

Apollo 11 was launched by a Saturn V rocket from Kennedy Space Center on Merritt Island, Florida, on July 16 at 9:32 am EDT (13:32 UTC) and was the fifth manned mission of NASA's Apollo program. The Apollo spacecraft had three parts: a command module (CM) with a cabin for the three astronauts, and the only part that returned to Earth; a service module (SM), which supported the command module with propulsion, electrical power, oxygen, and water; and a lunar module (LM) that had two stages – a descent stage for landing on the Moon, and an ascent stage to place the astronauts back into lunar orbit.

After being sent to the Moon by the Saturn V's third stage, the astronauts separated the spacecraft from it and traveled for three days until they entered into lunar orbit. Armstrong and Aldrin then moved into the lunar module Eagle and landed in the Sea of Tranquility. The astronauts used Eagle's upper stage to lift off from the lunar surface and rejoin Collins in the command module. They jettisoned Eagle before they performed the maneuvers that blasted them out of lunar orbit on a trajectory back to Earth. They returned to Earth and splashed down in the Pacific Ocean on July 24 after more than eight days in space.`,
      5000
    ),
  comments: [1001, 1002],
};

const story2 = {
  id: 2,
  title: "China's super-sized space plans may involve help from Russia",
  text: () =>
    delay(
      `Targeted to start flying by 2030, the LM-9 has a diameter of 10 meters, a height of 100 meters, 6000 tons of thrust from four first stage engines, and four booster rockets. With this size and lift, China's Academy of Launch Vehicle Technology (CALT) Chief Designer Long Lehao announced that the Long March 9 will be capable of lifting 140 metric tons to low Earth orbit (LEO), 50 tons to Earth-Moon transfer orbit, and 44 tons to Earth-Mars transfer orbit (140 tons is right between the projected lifts of NASA's Space Launch System (130 tons) and SpaceX's 150 ton BFR).

Given the China Academy of Launch Vehicle Technology's (CALT's) goal to make all its space launch vehicles fully reusable by 2035, a reusable version of the LM-9 is likely in the works.

Long states that the China National Space Administration (CNSA) has big plans for the LM-9. In addition to carrying taikonauts to the Moon and establishing a lunar base, the LM-9's 2030 inaugural will be a Martian soil sample return, following a Martian rover mission in 2020. Intriguingly, Long said that the LM-9's heavy payload could support a Chinese orbital solar powerplant, which would consist of orbiting solar panels transmitting energy back to power converters on Earth. While the LM-9 could launch military payloads like spy satellites, the 25 ton to LEO Long March 5, and 70 ton to LEO Kuaizhou 31 solid rocket would be more likely candidates for classified missions.`,
      5000
    ),
  comments: [1003, 1002],
};

const story3 = {
  id: 3,
  title: "Astronauts' snapshots from space light up the Twitterverse",
  text: () =>
    delay(
      `Astronauts have long enjoyed the best views of Earth. Now thanks to social media, the rest of the planet can peek over their shoulders.

Five of the six current crew members on the International Space Station are active on Twitter, posting photos of their daily activities, projects, spacewalks, and their out-of-this-world views of Earth from around 240 miles above its surface. Traveling at a rate of 5 miles per second, the ISS sees 16 sunrises and sunsets in a 24-hour period alone.

After launching in 1998, the ISS has seen more than 230 astronauts from 18 countries. The current crew includes Russians Oleg Artemyev and Sergey Prokopyev, Americans A.J. (Drew) Feustel, Ricky Arnold and S. Aunon-Chancellor, and German Alexander Gerst

Of the six, only Prokopyev doesn't maintain a Twitter account.
`,
      5000
    ),
  comments: [1004, 1001],
};

const story4 = {
  id: 4,
  title: 'Young Star May Be Devouring a Planet',
  text: () =>
    delay(
      `Researchers at NASA's Chandra X-ray Observatory may have watched a young star devouring a planet.
For decades, scientists have observed irregular dimming of RW Aur A, a young star in the Taurus-Auriga constellation. Questions about this star grew as it began to dim more frequently and for longer periods of time, according to Hans Moritz Guenther, a research scientist in MIT's Kavli Institute for Astrophysics and Space Research and lead author on the study. Physicists looking into the phenomenon have observed RW Aur A using NASA's Chandra X-ray Observatory, and the researchers believe that they may have found the reason for this dimming: This young star is "eating" a planet, Guenther told Space.com.

Based on new Chandra observations, Guenther's team thinks that two infant planetary bodies (at least one of which is big enough to be a planet) are colliding, and debris from this crash is falling into RW Aur A. This debris would create a "veil" of gas and dust that would obscure the star's light, according to a statement from Chandra. [The Puzzle of 'Tabby's Star': 9 NASA Explanations for Star's Odd Dimming]`,
      5000
    ),
  comments: [1001, 1002],
};

const story5 = {
  id: 5,
  title: 'Watch Astronauts Set Foot on the Moon in Historic NASA Footage',
  text: () =>
    delay(
      `Forty-nine years ago today, on July 20, 1969, humans set foot on the moon for the first time in history.

Across the country and around the globe, humans sat at their televisions and watched the live coverage, waiting to see what would happen to Neil Armstrong and Buzz Aldrin. You may know what will happen, but you can channel some of that excitement today and tomorrow (July 21) by watching historic footage from the Apollo 11 mission, which NASA is streaming to mark the 49th anniversary. Watch it here on Space.com, courtesy of NASA TV.

What to watch Armstrong and Aldrin steer their course down to the moon's surface? Tune in at 3:08 p.m. EDT. Want to hear Armstrong radio back to mission control to announce that "The Eagle has landed?" Tune in at 4:18 p.m. [Makings of a Moon Landing: 50 Years Ago, Apollo 11 Was One Year From ‘Giant Leap']

(Be aware that NASA will take a short break between airing prelaunch press footage Friday morning and streaming the moon landing itself for a press conference about its upcoming Parker Solar Probe, scheduled to launch in August. It breaks historical continuity, sure, but it's still pretty cool.)

Armstrong's famous first step will come later tonight, during a moonwalk that NASA will air beginning at 10:38 p.m. and culminating in Armstrong and Aldrin planting the U.S. flag deep in the moon's rocky surface at 11:41 p.m.

The footage will continue early Saturday morning as the astronauts return to the lunar module at 1:11 a.m. Armstrong and Aldrin head back to the orbiter beginning at 1:54 p.m. NASA has provided a timeline of some of the key moments of the mission if you want to clear your schedule for a particular event.

In 1969, the moon landing marked the culmination of almost a decade of top-priority research and engineering work by NASA undertaken amid serious geopolitical pressure from the Soviet Union. Americans from all corners of the country were deeply invested in the adventures of Armstrong, Aldrin and command module astronaut Michael Collins.`,
      5000
    ),
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
    newsFeed: () =>
      delay(
        {
          stories: getNewsFeedStories(),
          recommendedForYou: getRecommendedContent(),
        },
        700
      ),
    story: (_, { id }) => {
      switch (parseInt(id)) {
        case 1:
          return story1;
        case 2:
          return story2;
        case 3:
          return story3;
        case 4:
          return story4;
        case 5:
          return story5;
      }
    },
  },
  Story: {
    comments: parent => delay(parent.comments.map(id => getComment(id)), 1000),
  },
};

module.exports = { typeDefs, resolvers };
