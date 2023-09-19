const axios = require('axios');

const allPokemonsAPI = async()=>{
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/'
        let pokemons = [];
        do {
           
            let info = await axios.get(url);
            /* console.log(apiRequest.data) */
            let pokemonsApi = info.data
        
            let auxPokemons = pokemonsApi.results.map((poke)=>{
                return{
                    name: poke.name,
                    url: poke.url
                }
            });
            pokemons.push(...auxPokemons);
            url = pokemonsApi.next;
        } while (url!=null && pokemons.length < 40);
        
        let pokesWithData = await Promise.all(pokemons.map(async e=>{
            let pokemon = await axios.get(e.url);
            return{
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.front_default,
                hp: pokemon.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
                attack: pokemon.data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
                defense: pokemon.data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
                speed: pokemon.data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                types: pokemon.data.types.map((type) => type.type.name), // Obtener tipos
            }
        }))
       
        return (pokesWithData);
    } catch (error) {
        throw new Error(error.message);
    }
 
    
}

module.exports = { allPokemonsAPI };