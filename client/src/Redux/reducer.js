
import {GET_ALL_POKEMONS, GET_TYPES, GET_NAME_CHARACTERS, SET_FILTER_BY_ORIGIN, SET_FILTER_BY_TYPE, RESET_FILTER, SET_TYPES, ORDER_ATTACK, ORDER_BY_NAME} from "./action-type";

const initialState = {
    pokemons: [],
    allPokemons: [],
    allTypes: [],
    types: [],
    // Nuevos campos para rastrear los Pokémon por origen
    dbPokemons: [],
    apiPokemons: [],
  };

function rootReducer(state=initialState, action){
    switch (action.type){
        case GET_ALL_POKEMONS:
          const apiPokemons = action.payload.filter(pokemon => 'createdInDb' in pokemon);
          const dbPokemons = action.payload.filter(pokemon => !('createdInDb' in pokemon));
      
          return {
            ...state,
            pokemons: action.payload,
            allPokemons: action.payload, // Muestra todos los Pokémon sin filtrar
            apiPokemons: apiPokemons, // Opcional: Puedes guardar los Pokémon de la API en un campo separado si es necesario.
            dbPokemons: dbPokemons, // Opcional: Puedes guardar los Pokémon de la base de datos en un campo separado si es necesario.
          };
      


        case SET_TYPES:
            return{
                ...state,
                types: action.payload,
                allTypes: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                allTypes: action.payload,
            }
        case GET_NAME_CHARACTERS:
            return{
                ...state,
                allPokemons: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state,
            };
            case SET_FILTER_BY_TYPE:
               
                const filteredType = state.allPokemons.filter(poke => poke.types.includes(action.payload));
                console.log("Action payload:", action.payload);
                console.log("Filtered Type:", filteredType);
                return {
                    ...state,
                    pokemons: action.payload === 'All' ? state.allPokemons : filteredType
        

                };
                case SET_FILTER_BY_ORIGIN:
                    let originFilter = [];
                  
                    switch (action.payload) {
                      case 'DataBase':
                        originFilter = state.dbPokemons;
                        break;
                      case 'Api':
                        originFilter = state.apiPokemons;
                        break;
                      default:
                        originFilter = state.allPokemons;
                    }
                  
                    return {
                      ...state,
                      pokemons: originFilter,
                    };
                  
            
        case ORDER_BY_NAME:
            const sortedPokemons = action.payload === 'Ascendant'
            ? state.pokemons.sort((a,b)=>{
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0
            })
            
            : state.pokemons.sort((a,b)=>{
                if(a.name >b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            });
            
            return{
                ...state,
                pokemons: sortedPokemons,
            }
        case ORDER_ATTACK:
                const pokemonesAttack = state.pokemons;
                const sortedByAttack =
                  action.payload === 'Attack-ASC'
                    ? pokemonesAttack.sort((a, b) => {
                        if (a.attack > b.attack) {
                          return 1;
                        }
                        if (b.attack > a.attack) {
                          return -1;
                        }
                        return 0;
                      })
                    : pokemonesAttack.sort((a, b) => {
                        if (b.attack > a.attack) {
                          return 1;
                        }
                        if (a.attack > b.attack) {
                          return -1;
                        }
                        return 0;
                      });
                return { ...state, pokemons: sortedByAttack };
            
    
        default:
            return state;
    }
}

export default rootReducer;