import React from 'react';

const borderStyle = {
  borderStyle: 'solid',
  borderWidth: 1,
  padding: 5,
  marginBottom: 5,
};

export const Weapon = ({ weapon, loadingState }) => (
  <div>
    <p>Name: {loadingState.name._isLoaded ? weapon.name : '...'}</p>
    <p>
      Strength:{' '}
      {loadingState.strength._isLoaded ? weapon.strength : '...' }
    </p>
  </div>
);

export const CharacterCard = ({ character, loadingState }) => (
  <div style={borderStyle}>
    <p>ID: {character.id}</p>
    <p>
      Name:{' '}
      {loadingState.name._isLoaded ? character.name : '...'}
    </p>

    <div style={borderStyle}>
      {loadingState.friends._isLoaded
        ? character.friends.map((friend, i) => (
          <p key={friend.id}>
            {friend.id}:{' '}
            {loadingState.friends[i].name._isLoaded
              ? friend.name
              : '...'}
          </p>
        ))
        : 'loading friends...'
      }
    </div>

    <div style={borderStyle}>
      {loadingState.weapon._isLoaded ? (
        <Weapon
          weapon={character.weapon}
          loadingState={loadingState.weapon}
        />
      ) : (
        'loading weapon...'
      )}
    </div>
  </div>
);
