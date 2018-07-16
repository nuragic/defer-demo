/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

const vader = {
  type: 'Human',
  id: '1001',
  name: 'Darth Vader',
  friends: ['1004'],
  appearsIn: [4, 5, 6],
  homePlanet: 'Tatooine',
};

const luke = {
  type: 'Human',
  id: '1000',
  name: () => delay('Luke Skywalker', 500),
  friends: ['1002', '1003', '2000', '2001'],
  appearsIn: [4, 5, 6],
  homePlanet: 'Tatooine',
  soulmate: vader,
  weapon: () => delay({
    name: 'Light Saber',
    strength: () => delay('High', 2000),
  }, 1500),
};

const han = {
  type: 'Human',
  id: '1002',
  name: () => delay('Han Solo', 500),
  friends: ['1000', '1003', '2001'],
  appearsIn: [4, 5, 6],
  soulmate: {
    type: 'Human',
    id: () =>
      new Promise(() => {
        throw new Error('Han Solo only goes solo');
      }),
    name: () =>
      new Promise(() => {
        throw new Error('Han Solo only goes solo');
      }),
  },
};

const leia = {
  type: 'Human',
  id: '1003',
  name: () => delay('Leia Organa', 200),
  friends: ['1000', '1002', '2000', '2001'],
  appearsIn: [4, 5, 6],
  homePlanet: 'Alderaan',
};

const tarkin = {
  type: 'Human',
  id: '1004',
  name: 'Wilhuff Tarkin',
  friends: ['1001'],
  appearsIn: [4],
};

const humanData = {
  '1000': luke,
  '1001': vader,
  '1002': han,
  '1003': leia,
  '1004': tarkin,
};

const threepio = {
  type: 'Droid',
  id: '2000',
  name: 'C-3PO',
  friends: ['1000', '1002', '1003', '2001'],
  appearsIn: [4, 5, 6],
  primaryFunction: 'Protocol',
};

const artoo = {
  type: 'Droid',
  id: '2001',
  name: 'R2-D2',
  friends: ['1000', '1002', '1003'],
  appearsIn: [4, 5, 6],
  primaryFunction: 'Astromech',
};

const droidData = {
  '2000': threepio,
  '2001': artoo,
};

function delay(result, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result);
    }, delay);
  });
}
/**
 * Helper function to get a character by ID.
 */
function getCharacter(id) {
  // Returning a promise just to illustrate GraphQL.js's support.
  return humanData[id] || droidData[id];
}

/**
 * Allows us to query for a character's friends.
 */
function getFriends(character) {
  // Notice that GraphQL accepts Arrays of Promises.
  return delay(character.friends.map(id => getCharacter(id)), 1000);
}

/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
function getHero(episode) {
  if (episode === 5) {
    // Luke is the hero of Episode V.
    return luke;
  }
  // Artoo is the hero otherwise.
  return delay(artoo, 1000);
}

/**
 * Allows us to query for the human with the given id.
 */
function getHuman(id) {
  return humanData[id];
}

/**
 * Allows us to query for the droid with the given id.
 */
function getDroid(id) {
  return droidData[id];
}

module.exports = {
  getHero,
  getHuman,
  getFriends,
  getDroid,
};
