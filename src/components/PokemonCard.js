import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Type: {pokemon.type}</p>
    </div>
  );
};

export default PokemonCard;
