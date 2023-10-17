import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./Detail.css"
function Detail(){
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({})
    useEffect(()=>{
        axios(`https://backend-pi-1pc3.onrender.com/pokemons/${id}`)
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

    const typeBackgroundColors = {
        fire: '#f7a04cee',
        water: '#0086ff',
        normal: '#b4b4b4',
        fighting:"#ff8200",
        flying:"#00aaff",
        poison: "#8f0eaf",
        ground:"#8f6200",
        rock:"#b4b4b4",
        bug:"#00ac00",
        ghost:"#9100ff",
        steel:"#616161",
        grass:"#3cb371",
        electric:"#ffe300",
        psychic:"#ff00ce",
        ice:"#1cc1ff",
        dragon:"rgba(128, 128, 128, 0.932)",
        dark:"#3c3c3c",
        fairy:"#ee82ee",

      };
    return (
        
        <div  className="detail-container"
        style={{
          backgroundColor:
            typeBackgroundColors[pokemon.types?.[0]] || 'white', // Usamos el primer tipo (puedes personalizar esto según tus necesidades)
        }}>
            <h2 className="pokemon-number">Pokedex N°: {pokemon?.id}</h2> 
            <div className="img-container">
                <img className="pokemon-image" src={pokemon?.image} alt={pokemon?.name} />
            </div>
            <h2 className="pokemon-name">Name: {pokemon?.name}</h2>
            <h2 className="pokemon-stats">HP: {pokemon?.hp}</h2>
            <h2 className="pokemon-stats">Attack: {pokemon?.attack}</h2>
            <h2 className="pokemon-stats">Defense: {pokemon?.defense}</h2>
            <h2 className="pokemon-stats">Speed: {pokemon?.speed}</h2>
            <h2 className="pokemon-stats">Height: {pokemon?.height}</h2>
            <h2 className="pokemon-stats">Weight: {pokemon?.weight}</h2>
            <h2 className="pokemon-types">
                Types:
                {pokemon.types?.map((type) => {
                    return (
                    <p
                        className="types"
                    >
                        - {type}
                    </p>
                    );
                })}
            </h2>
           
        </div>
    )
}

export default Detail;