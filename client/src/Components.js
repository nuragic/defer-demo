import React from 'react';

const borderStyle = { borderStyle: 'solid', borderWidth: 1, padding: 5, marginBottom: 5 };

export const Weapon = ({ weapon, weaponLoadingState }) => (
  <div>
    <p>Name: {weapon.name}</p>
    <p>
      Strength: {weaponLoadingState.children.strength.loading ? '...' : weapon.strength}{' '}
    </p>
  </div>
);

export const CharacterCard = ({ character, characterLoadingState }) => (
  <div style={borderStyle}>
    <p>ID: {character.id}</p>
    <p>
      Name:{' '}
      {characterLoadingState.children.name.loading ? '...' : character.name}
    </p>
    <div style={borderStyle}>
      {characterLoadingState.children.weapon.loading ? (
        'loading weapon...'
      ) : (
        <Weapon
          weapon={character.weapon}
          weaponLoadingState={characterLoadingState.children.weapon}
        />
      )}
    </div>
    <div style={borderStyle}>
      {characterLoadingState.children.friends.loading
        ? 'loading friends...'
        : character.friends.map(friend => (
            <p key={friend.id}>
              {friend.id}: {friend.name},{' '}
            </p>
          ))}
    </div>
  </div>
);
