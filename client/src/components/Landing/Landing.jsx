import React from "react";
import {NavLink} from "react-router-dom";
import './Landing.css';

const Landing=()=>{
    return (
        <div className="landing-page">
            
            <div className="content">
                <h1 className="titulo">Pokémon App</h1>
                <h2 className="subtitulo">Gotta catch 'em all</h2>
                <NavLink to="/home">
                    <div className="pokeball-container">
                        <div className="pokeball">
                            <div className="line"></div>
                            <div className="circle"></div>
                            <div className="circle-mini"></div>
                        </div>
                    </div>
                </NavLink>
                <h3 className="text-pokeball">CLICK THE POKEBALL</h3>
            </div>
        </div>
    )
}

export default Landing;