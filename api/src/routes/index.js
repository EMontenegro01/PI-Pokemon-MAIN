/* const getAllPokemons = require('../controllers/getAllPokemons'); */
const getPokemonById = require('../controllers/getPokemonById');
const getPokemonByName = require('../controllers/getPokemonByName');
const postPokemon = require('../controllers/postPokemon');
const getTypes = require('../controllers/getTypes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = require('express').Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons/:idPokemon', (req, res)=>{
    getPokemonById(req, res);
})

router.get('/pokemons', (req, res) => {
    getPokemonByName(req, res);
});

router.post('/pokemons', (req, res) => {
    postPokemon(req, res);
});

router.get('/types', (req,res)=>{
  getTypes(req, res);
})

module.exports = router;
