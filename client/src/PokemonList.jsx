import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList((prevList) => [...prevList, ...response.data.results]);
      } catch (err) {
        console.error('Erro ao buscar a lista de Pokémon.', err);
        setError('Erro ao buscar a lista de Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchMorePokemon();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pokemonList]);

  const fetchMorePokemon = async () => {
    try {
      setLoading(true);

      const lastPokemon = pokemonList[pokemonList.length - 1];
      const response = await axios.get(lastPokemon.url);
      setPokemonList((prevList) => [...prevList, ...response.data.results]);
    } catch (err) {
      console.error('Erro ao buscar mais Pokémon.', err);
      setError('Erro ao buscar mais Pokémon.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Lista de Pokémon</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
        {loading ? <p>Carregando...</p> : null}
        {error ? <p>{error}</p> : null}
      </ul>
    </div>
  );
};

export default PokemonList;
