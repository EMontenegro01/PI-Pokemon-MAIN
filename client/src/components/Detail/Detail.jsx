import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
function Detail(){
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({})
    useEffect(()=>{
        axios(`http://localhost:3001/pokemons/${id}`)
        .then(({data})=>{
            if(data.name){
                setPokemon(data);
            }
            else{
                window.alert('No hay pokemons con ese ID');
            }
        });
        return setPokemon({});
    }, [id]);
    return (
        <div>
            <h2>Pokedex N°: {pokemon?.id}</h2> 
            <h2>Name: {pokemon?.name}</h2>
            <h2>HP: {pokemon?.hp}</h2>
            <h2>Attack: {pokemon?.attack}</h2>
            <h2>Defense: {pokemon?.defense}</h2>
            <h2>Speed: {pokemon?.speed}</h2>
            <h2>Height: {pokemon?.height}</h2>
            <h2>Weight: {pokemon?.weight}</h2>
            <h2>Types: {pokemon.types?.map(type=>{
                return(<ul>-{type}</ul>)
            })}</h2>
            <img src={pokemon?.image} alt={pokemon?.name} />
        </div>
    )
}

export default Detail;