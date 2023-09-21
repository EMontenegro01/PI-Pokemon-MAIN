import React, { useState } from 'react';
import './SearchBar.css';

import { getNameCharacters } from '../../Redux/actions';
import {useDispatch} from 'react-redux';

export default function SearchBar() {
    const dispatch=useDispatch()

    //estado local para guardar la busqueda
    const [name, setName] = useState('')

    //con esta funcion  seteamos en el name el nombre del input
    function handleInputChange(e){
        e.preventDefault()
        
        setName(e.target.value)
        console.log(name)
      
    }

     //con esta funcion despachamos la accion getName... con el nombre a buscar 
     function handleSubmit(e){
        e.preventDefault()

        console.log("El boton submit funciona !!!" + name)
        //console.log("El nombre enviado desde el handleSubmit---> " + name)

        dispatch(getNameCharacters(name))
        setName('')
       
        
    }

    return (
        <div className="search-container" >
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInputChange} value={name} placeholder="Search..."/>
                <input type="submit" value="Buscar"/>
            </form>

        </div>
    )

}