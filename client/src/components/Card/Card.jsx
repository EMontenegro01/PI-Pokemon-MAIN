import './Card.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
function Card({ pokemon }) {
  const { id, name,image, types } = pokemon;

  return (
    <div className="card-container">
      <NavLink to={`/detail/${id}`}>
          <h2>{name.toUpperCase()}</h2>
      </NavLink>
     
      
   
      <img src={image} alt="" className='pokemon-img' />
      <div>
        {types.map((type, index) => (
          <h3 key={index}>{type.toUpperCase()}</h3>
        ))}
      </div>
    </div>
  );
}

export default Card;
