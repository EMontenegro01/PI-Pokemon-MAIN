import React from "react";
import "./Pagination.css"

const Pagination = ({pokemonsPerPage, allPokemons, pagination}) =>{
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allPokemons / pokemonsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav className="nav">
          <ul className="ul">
            {pageNumbers &&
              pageNumbers.map((number) => (
                <ul key={number}>
                  <button  className="button" onClick={() => pagination(number)}>{number}</button>
                </ul>
              ))}
          </ul>
        </nav>
      );
}
export default Pagination;