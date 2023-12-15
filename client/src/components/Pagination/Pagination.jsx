import React from "react";
import "./Pagination.css";

const Pagination = ({ pokemonsPerPage, allPokemons, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="page-list">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button className="page-button" onClick={() => pagination(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
