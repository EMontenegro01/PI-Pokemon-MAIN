// controllers/getAllPokemons.js

const { allPokemonsAPI } = require('./handlers/pokemonAPI');
const { allPokemonsDB } = require('./handlers/pokemonDB');

const getAllPokemons = async () => {
  const pokemonsAPI = await allPokemonsAPI();
  const pokemonsDB = await allPokemonsDB();
  const allPokemons = [...pokemonsAPI, ...pokemonsDB];

  
  return allPokemons;
};

module.exports = getAllPokemons;
