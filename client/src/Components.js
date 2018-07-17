import React from 'react';

const borderStyle = {
  borderStyle: 'solid',
  borderWidth: 1,
  padding: 5,
  marginBottom: 5,
};

export const Weapon = ({ weapon, loadingState }) => (
  <div>
    <p>Name: {loadingState.name ? weapon.name : '...'}</p>
    <p>Strength: {loadingState.strength ? weapon.strength : '...'}</p>
  </div>
);

export const CharacterCard = ({ character, loadingState }) => (
  <div style={borderStyle}>
    <p>ID: {character.id}</p>
    <p>Name: {loadingState.name ? character.name : '...'}</p>

    <div style={borderStyle}>
      {loadingState.friends
        ? character.friends.map((friend, i) => (
            <p key={friend.id}>
              {friend.id}: {loadingState.friends[i].name ? friend.name : '...'}
            </p>
          ))
        : 'loading friends...'}
    </div>

    <div style={borderStyle}>
      {loadingState.weapon ? (
        <Weapon weapon={character.weapon} loadingState={loadingState.weapon} />
      ) : (
        'loading weapon...'
      )}
    </div>
  </div>
);
