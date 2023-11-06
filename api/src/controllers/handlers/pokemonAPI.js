const Promise = require('bluebird');
const axios = require('axios');

const allPokemonsAPI = async () => {
  try {
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    let pokemons = [];
    do {
      const info = await axios.get(url);
      const pokemonsApi = info.data;
      const auxPokemons = pokemonsApi.results.map((poke) => {
        return {
          name: poke.name,
          url: poke.url
        };
      });
      pokemons.push(...auxPokemons);
      url = pokemonsApi.next;
    } while (url != null && pokemons.length < 151);

    const pokesWithData = await Promise.map(
      pokemons,
      async (e) => {
        const pokemon = await axios.get(e.url);
        return {
          id: pokemon.data.id,
          name: pokemon.data.name,
          image: pokemon.data.sprites.front_default,
          hp: pokemon.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          attack: pokemon.data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          defense: pokemon.data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          speed: pokemon.data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map((type) => type.type.name),
        };
      },
      { concurrency: 5 } // Control de la velocidad de las solicitudes (5 solicitudes a la vez)
    );

    return pokesWithData;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { allPokemonsAPI };
