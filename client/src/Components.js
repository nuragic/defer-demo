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
    <p>
      <strong>Stats</strong>
    </p>
    <p>ID: {character.id}</p>
    <p>Name: {loadingState.name ? character.name : '...'}</p>

    <div style={borderStyle}>
      {loadingState.friends ? (
        <div>
          <p>
            <strong>Friends</strong>
          </p>
          {character.friends.map((friend, i) => (
            <p key={friend.id}>
              {friend.id}: {loadingState.friends[i].name ? friend.name : '...'}
            </p>
          ))}
        </div>
      ) : (
        'loading friends...'
      )}
    </div>

    <div style={borderStyle}>
      {loadingState.weapon ? (
        <div>
          <p>
            <strong>Weapon</strong>
          </p>
          <Weapon
            weapon={character.weapon}
            loadingState={loadingState.weapon}
          />
        </div>
      ) : (
        'loading weapon...'
      )}
    </div>

    <div style={borderStyle}>
      {loadingState.soulmate ? (
        <div>
          <p>
            <strong>Soulmate</strong>
          </p>
          <p>Name: {character.soulmate.name}</p>
          <p>
            Weapon Name:{' '}
            {loadingState.soulmate.weapon.name
              ? character.soulmate.weapon.name
              : '...'}
          </p>
          <p>
            Weapon Strength:{' '}
            {loadingState.soulmate.weapon.strength
              ? character.soulmate.weapon.strength
              : '...'}
          </p>
        </div>
      ) : (
        'loading soulmate...'
      )}
    </div>
  </div>
);
