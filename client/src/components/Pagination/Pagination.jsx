import React from "react";
import Card from "../Card/Card";
import Error from "../Error/Error";

const Pagination = ({pokemonsPerPage, allPokemons, pagination}) =>{
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPokemons / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
          <ul>
            {pageNumbers &&
              pageNumbers.map((number) => (
                <ul key={number}>
                  <button onClick={() => pagination(number)}>{number}</button>
                </ul>
              ))}
          </ul>
        </nav>
      );
}
export default Pagination;