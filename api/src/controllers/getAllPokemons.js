const {Pokemon} = require('../db');

const getAllPokemons = async(req, res)=>{
    try {
        const pokemons = await Pokemon.findAll(); //Obtengo los pokemons de la BD

        //Datos como un arreglo de objetos
        const arrayPokemons = pokemons.map((poke) => ({
            id: poke.id,
            name: poke.name,
            image: poke.image,
            hp: poke.hp,
            attack: poke.attack,
            defense: poke.defense,
            speed: poke.speed,
            height: poke.height,
            weight: poke.weight
        }));
    
    return res.status(200).json(arrayPokemons);

    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al obtener los Pokemons' });
    }
}

module.exports = getAllPokemons;