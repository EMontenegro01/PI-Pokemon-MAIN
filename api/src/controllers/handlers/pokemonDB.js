const { Pokemon, Type } = require('../../db');


const allPokemonsDB = async () => {
  try {
    const pokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
       /*  through: {attributes: [],}, */
      }
      
    });
    console.log(pokemons)
    const pokemonsWithTypes = pokemons.map(poke=>({
      id: poke.dataValues.id,
      name: poke.dataValues.name,
      image: poke.dataValues.image,
      hp: poke.dataValues.hp,
      attack: poke.dataValues.attack,
      defense: poke.dataValues.defense,
      speed: poke.dataValues.speed,
      height: poke.dataValues.height,
      weight: poke.dataValues.weight,
      types: poke.dataValues.Types.map(type=>type.name)
    }))
    
    return pokemonsWithTypes
    
  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports = {allPokemonsDB };