import {GET_ALL_POKEMONS, GET_TYPES, GET_NAME_CHARACTERS, SET_FILTER_BY_ORIGIN, SET_FILTER_BY_TYPE, RESET_FILTER, SET_TYPES, ORDER_ATTACK, ORDER_BY_NAME} from "./action-type";
import axios from "axios";
const BASE_URL = "http://localhost:3001";

export const getAllPokemons = () => {
    return async (dispatch) => {
      try {
        // Realizar una solicitud GET al endpoint de pokemones
        const response = await axios.get("http://localhost:3001/pokemons");
  
        // Despachar la acción para almacenar los datos en el estado de Redux
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: response.data, // Suponiendo que response.data contiene los pokemones
        });
      } catch (error) {
        // Manejar errores si la solicitud falla
        console.error("Error al obtener los pokemones:", error);
      }
    };
  };

  export const getAllTypes = ()=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get(`${BASE_URL}/types`);

            dispatch({
                type: GET_TYPES,
                payload:response.data
            });
        } catch(error){
            console.error("Error al obtener los tipos:", error);
        }
    }
}

export const setTypes=()=>{
  return async (dispatch)=>{
    try {
      axios.post('http://localhost:3001/types').then((types)=>{
        dispatch({
          type: SET_TYPES,
          payload: types.data,
        })
      })
    } catch (error) {
      console.error(error)
    }
 
  }
}

export const getNameCharacters=(name)=>{
  console.log("El nombre de la searchbar es .... " + name)
  return async function( dispatch){
      try{
          const response = await axios.get("http://localhost:3001/pokemons?name=" + name);
          return dispatch({
              type:GET_NAME_CHARACTERS,
              payload: response.data
          })
      }catch(error){
          console.log(error)
      }
  }
}
export const setFilterByOrigin = (payload)=>{
  return{
    type: SET_FILTER_BY_ORIGIN,
    payload,
  };
};

export const setFilterByType = (types)=>{
  return{
    type: SET_FILTER_BY_TYPE,
    payload: types
  }
}

export const orderByAttack = (payload)=>{
  return{
    type: ORDER_ATTACK,
    payload,
  }
}

export const orderByName = (payload)=>{
  return{
    type: ORDER_BY_NAME,
    payload,
  }
}

