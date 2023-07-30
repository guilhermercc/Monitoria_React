import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (pokemonNumber) {
          setLoading(true);
          setError(null);

          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
          setPokemonData(response.data);
        }
      } catch (err) {
        setError('Erro ao buscar informações do Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonNumber]);

  const handleInputChange = (event) => {
    setPokemonNumber(event.target.value);
    console.log(pokemonNumber)
  };

  const handleRefreshClick = () => {
    setPokemonData(null);
  };

  return (
    <div>
      <input type="number" value={pokemonNumber} onChange={handleInputChange} />
      <button onClick={handleRefreshClick}>Atualizar</button>
      {loading ? <p>Carregando...</p> : null}
      {error ? <p>{error}</p> : null}
      {pokemonData ? (
      <div>
        <h2>{pokemonData.name}</h2>
        <p>Tipo: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
      <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`} alt={pokemonData.name} />
      
    </div>
      ) : null}
    </div>
  );
};

export default PokemonDetails;
