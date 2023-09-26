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
    dispatch(getAllPokemons());

    // Obtener los tipos de la API
    dispatch(getAllTypes())
      .then(() => {
        setAreTypesLoaded(true); // Marcar que los tipos se han cargado
      })
      .catch((error) => {
        console.error("Error al obtener tipos:", error);
      });
  }, [dispatch]);

  // FILTRADO POR TYPE
  const handleTypeFilter = (e) => {
    console.log("Tipo seleccionado:", e.target.value);
    dispatch(setFilterByType(e.target.value));
  };

  // FILTRADO POR API O DB
  const handleFilterOrigin = (e) => {
    const filterValue = e.target.value;
    console.log("Created in:", filterValue);
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
      <h2 className="home-title">HOME</h2>
      <div>
        <select className="orderFilters" onChange={(e) => handleOrderByName(e)}>
          <option value="Ascendant">A-Z</option>
          <option value="Descendant">Z-A</option>
        </select>

        <select
          className="orderFilters"
          onChange={(e) => handleOrderByAttack(e)}
        >
          <option value="Default">Default</option>
          <option value="Attack-ASC">Ascending attack</option>
          <option value="Attack-DESC">Descending attack</option>
        </select>

        {/* Filtrado por tipo habilitado solo cuando los tipos están cargados */}
        <select
          className="orderFilters"
          onChange={handleTypeFilter}
          disabled={!areTypesLoaded} // Deshabilita el filtro hasta que los tipos estén cargados
        >
          <option value="">Filter by type</option>
          <option value="All">All</option>
          {allTypes &&
            allTypes.map((tipo) => (
              <option key={tipo.id} value={tipo.name}>
                {" "}
                {tipo.name}{" "}
              </option>
            ))}
        </select>

        <select className="orderFilters" onChange={(e) => handleFilterOrigin(e)}>
          {/* <option value="">Created by</option> */}
          <option value="All">All</option>
          <option value="DataBase">Data Base</option>
          <option value="Api">Api</option>
        </select>
      </div>

      <Cards currentPokemons={currentPokemons} allTypes={allTypes} />
<div>
  <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons?.length} pagination={pagination} />
</div>

    </div>
  );
}

export default Home;
