import React from 'react';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';

function App() {
  return (

    <div>
      <h1>Detalhes do Pokémon</h1>
      <PokemonDetails />
      <hr />
      <h1>Lista de Pokémon</h1>
      <PokemonList />
    </div>
  );
}

export default App;
