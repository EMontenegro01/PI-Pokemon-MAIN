const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

    // Crea el nuevo Pokémon en la base de datos
    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    const typesWithOriginDB = types.map(async (type) => {
      const [foundType] = await Type.findOrCreate({
        where: { name: type },
        defaults: { name: type},
      });
      return foundType;
    });

 
    const createdTypes = await Promise.all(typesWithOriginDB);

    // Relaciona el nuevo Pokémon con los tipos creados
    await newPokemon.addTypes(createdTypes);

    // Formatea la propiedad 'types' como un arreglo de strings
    newPokemon.types = types;

    return res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postPokemon;

