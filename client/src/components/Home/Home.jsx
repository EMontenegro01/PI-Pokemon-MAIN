import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterByOrigin,
  setFilterByType,
  getAllTypes,
  getAllPokemons,
  orderByAttack,
  orderByName,
} from "../../Redux/actions";

import Cards from "../Cards/Cards";
import "./Home.css";
import Pagination from "../Pagination/Pagination";

function Home() {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.allTypes);
  const [areTypesLoaded, setAreTypesLoaded] = useState(false); // Nuevo estado
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar el loading


  //**PAGINADO**
  const [currentPage, setCurrentPage] = useState(1);//currentPage=estado con la pagina actual y el otro estado(setCurrentPage) que setee la pagina actual
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12) //setea cuantas cartas quiero por pagina
  const indexOfLastPokemon = currentPage * pokemonsPerPage // indice del ultimo pokemon que yo tengo en la pagina
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; //indice del primer pokemon
  const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon) // pokemons que estan en la pagina actual
  
  const pagination = (pageNumber) =>{
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    // Cuando la página se carga, establece isLoading en true
    setIsLoading(true);
  
    // Realiza la llamada a la API para obtener todos los tipos primero
    dispatch(allTypes())
      .then(() => {
        // Después de que los tipos se hayan cargado con éxito, realiza la llamada a la API para obtener todos los Pokémon
        return dispatch(allPokemons());
      })
      .then(() => {
        // Cuando ambas llamadas a la API hayan respondido con éxito, establece isLoading en false
        setIsLoading(false);
        setAreTypesLoaded(true);
      })
      .catch((error) => {
        // Manejo de errores si alguna de las llamadas a la API falla
        console.error('Error al cargar los datos:', error);
        setIsLoading(false); // Asegúrate de establecer isLoading en false incluso en caso de error
      });
  }, [dispatch]);
  
  // FILTRADO POR TYPE
  const handleTypeFilter = (e) => {
    console.log("Tipo seleccionado:", e.target.value);
    setCurrentPage(1);
    dispatch(setFilterByType(e.target.value));
  };

  // FILTRADO POR API O DB
  const handleFilterOrigin = (e) => {
    const filterValue = e.target.value;
    console.log("Created in:", filterValue);
    setCurrentPage(1);
    dispatch(setFilterByOrigin(filterValue));
  };

  // ORDEN POR ATTACK
  const handleOrderByAttack = (e) => {
    const orderValue = e.target.value;
    dispatch(orderByAttack(orderValue));
    setOrder(`Ordenado ${orderValue}`);
  };

  // ORDEN POR NAME
  const handleOrderByName = (e) => {
    const orderValue = e.target.value;
    dispatch(orderByName(orderValue));
    setOrder(`Ordenado ${orderValue}`);
  };



  return (
    <div className="home">
      {isLoading ? (
        // Muestra el loading mientras isLoading sea true
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h2 className="home-title">HOME</h2>
          <div>
            <select className="orderFilters" onChange={(e) => handleOrderByName(e)}>
              <option value="" disabled selected>
                Order by Name
              </option>
              <option className="option" value="Ascendant">A-Z</option>
              <option className="option" value="Descendant">Z-A</option>
            </select>

            <select
              className="orderFilters"
              onChange={(e) => handleOrderByAttack(e)}
            >
              <option value="" disabled selected>
                Order by Attack
              </option>

              <option className="option" value="Attack-ASC">Ascending attack</option>
              <option className="option" value="Attack-DESC">Descending attack</option>
            </select>

            {/* Filtrado por tipo habilitado solo cuando los tipos están cargados */}
            <select
              className="orderFilters"
              onChange={handleTypeFilter}
              disabled={!areTypesLoaded}
            >
              <option value="" disabled selected>
                Filter by type
              </option>
              <option className="option" value="All">All</option>
              {allTypes &&
                allTypes.map((tipo) => (
                  <option className="option" key={tipo.id} value={tipo.name}>
                    {" "}
                    {tipo.name}{" "}
                  </option>
                ))}
            </select>

            <select className="orderFilters" onChange={(e) => handleFilterOrigin(e)}>
              <option value="" disabled selected>
                Order by Origin
              </option>
              <option className="option" value="All">All</option>
              <option className="option" value="DataBase">Data Base</option>
              <option className="option" value="Api">Api</option>
            </select>
          </div>
          <Cards currentPokemons={currentPokemons} allTypes={allTypes} />
          <div>
            <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons?.length} pagination={pagination} />
          </div>
        </>
      )}
    </div>
  );

}

export default Home;
