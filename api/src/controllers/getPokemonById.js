const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemonById = async (req, res) => {
  const { idPokemon } = req.params;

  try {
    // Buscar el Pokémon en la base de datos local
    if(isNaN(idPokemon)){
      const localPokemon = await Pokemon.findOne({
        where: { id: idPokemon },
        include: {
          model: Type,
          attributes: ['name'],
          through: {attributes: [],},
        }// Incluye el tipo del Pokémon
      });  
      if (localPokemon) {
        // Si se encuentra en la base de datos local, devuelve los detalles locales
        return res.status(200).json(localPokemon);
      }
    }
  else{
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);

    if (data.name) {
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type) => type.type.name), // Obtener tipos
      };
      return res.status(200).json(pokemon);
    }

    return res.status(404).send('Pokemon Not found');
  }
    // Si no se encuentra en la base de datos local, realiza una solicitud a la API
 
  } catch (error) {

    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonById;
