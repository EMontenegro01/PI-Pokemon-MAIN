import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import './NavBar.css'
import SearchBar from "../SearchBar/SearchBar";



export default function NavBar() {

  const location = useLocation();

 

  return (
    <nav className="nav-container">
      <SearchBar />
      {location.pathname !== "/home" && (
        <button className="button-back">
          <NavLink to='/home'>BACK</NavLink>
        </button>
      )}
      {location.pathname !== "/form" && (
        <button className="button-home">
          <NavLink to='/form'>CREATE POKEMON</NavLink>
        </button>
      )}
      <button className="button-exit">
        <NavLink to='/'>EXIT</NavLink>
      </button>
      
    </nav>
  );
}
