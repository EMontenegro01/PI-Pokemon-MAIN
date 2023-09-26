const { Pokemon } = require('../db');

const getPokemonsByOrigin = async (req, res) => {
  try {
    const { origin } = req.query;

    // Construye un objeto de filtro basado en la consulta del usuario
    const filter = {};

    if (origin === 'API') {
      filter.createdInDb = false; // Filtra por Pokémon de la API
    } else if (origin === 'DB') {
      filter.createdInDb = true; // Filtra por Pokémon creados en la base de datos
    }

    // Realiza la consulta a la base de datos con los filtros
    const pokemons = await Pokemon.findAll({
      where: filter,
    });

    return res.status(200).json(pokemons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonsByOrigin;
