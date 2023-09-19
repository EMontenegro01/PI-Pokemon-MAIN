const { allPokemonsAPI } = require('./handlers/pokemonAPI');
const { allPokemonsDB } = require('./handlers/pokemonDB');

const getPokemonByName = async (req, res) => {
    const { name } = req.query;
    const pokemonsAPI = await allPokemonsAPI();
    const pokemonsDB = await allPokemonsDB();
    const allPokemons = [...pokemonsAPI, ...pokemonsDB];
    
    try {
        if (name !== undefined) {
            let rta = allPokemons.filter(e => e.name && e.name.toLowerCase().includes(name.toLowerCase()));
            rta.length ? res.status(200).send(rta) : res.status(400).send('error');
        } else {
            res.status(200).send(allPokemons);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = getPokemonByName;
