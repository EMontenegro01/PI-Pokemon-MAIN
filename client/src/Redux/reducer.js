import { SET_ALL_POKEMONS, SET_ALL_TYPES, GET_NAME_CHARACTERS } from "./action-type";
const initialState = {
    allPokemons: [],
    pokemonsByName: [],
    allTypes: []
}

function rootReducer(state=initialState, action){
    switch (action.type){
        case SET_ALL_POKEMONS:
            return{
                ...state,
                allPokemons: action.payload
            }
        case SET_ALL_TYPES:
            return{
                ...state,
                allTypes: action.payload
            }
        case GET_NAME_CHARACTERS:
            return{
                ...state,
                allPokemons: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;