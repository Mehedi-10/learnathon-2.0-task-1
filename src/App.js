import React, { useState, useEffect } from 'react';
import TypeSelector from './components/TypeSelector';
import PokemonList from './components/PokemonList';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => {
        setTypes(data.results.map((type) => type.name));
        return fetch('https://pokeapi.co/api/v2/pokemon');
      })
      .then((response) => response.json())
      .then((data) => {
        const fetchPokemonDetails = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );
        return Promise.all(fetchPokemonDetails);
      })
      .then((pokemonsDetails) => {
        const pokemonsWithImages = pokemonsDetails.map((pokemon) => ({
          name: pokemon.name,
          image: pokemon.sprites.front_default,
          type: pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')
        }));
        setPokemons(pokemonsWithImages);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) => {
    if (!selectedCategory) return true;
    return pokemon.type.includes(selectedCategory);
  });

  return (
    <div className="App">
      <h1>Pokemon Showcase</h1>
      <TypeSelector types={types} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {!isLoading && !error && (
        <PokemonList pokemons={filteredPokemons} />
      )}
    </div>
  );
};

export default App;
