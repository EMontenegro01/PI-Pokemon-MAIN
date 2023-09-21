import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SearchBar from './components/SearchBar/SearchBar';
import Detail from './components/Detail/Detail';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getAllPokemons } from "./Redux/actions"; 
function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const allPokemons = useSelector((state)=>state.allPokemons);

  useEffect(()=>{
      dispatch(getAllPokemons())


  },[dispatch]) 

  return (
    <div>
      {pathname !== '/' ? <NavBar /> : null}
     
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
      </Routes>
    </div>
  );
}

export default App;



