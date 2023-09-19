import { SET_ALL_POKEMONS, SET_ALL_TYPES } from "./action-type";
const initialState = {
    allPokemons: [],
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
        default:
            return state;
    }
}

export default rootReducer;