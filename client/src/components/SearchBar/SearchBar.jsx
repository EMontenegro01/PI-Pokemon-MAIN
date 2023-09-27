import React, { useState } from 'react';
import './SearchBar.css';

import { getNameCharacters } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom'

export default function SearchBar() {

  const location = useLocation()
  if (location.pathname === '/form') {
    // No renderizar la barra de búsqueda si la ruta es /form
    return null;
  }
  const dispatch = useDispatch();

  // Estado local para guardar la búsqueda
  const [name, setName] = useState('');

  // Con esta función seteamos en el name el nombre del input
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  // Con esta función despachamos la acción getName... con el nombre a buscar
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCharacters(name));
    setName('');
  }

  return (
    <form className="searchBox" onSubmit={handleSubmit}>
      <div className='searchInputContainer'>
        <input
          className='searchInput'
          type="text"
          onChange={handleInputChange}
          value={name}
          placeholder="Search Pokémon"
        />
        <button className='searchButton' type="submit" value="Buscar">
            🔍︎
        </button>
      </div>
    </form>
  );
}
