import './Card.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
const Card = ({id,name,image,types})=>{

  if (!(typeof types[0]=== "string")){
      for(let i = 0; i<types.length;i++){
          types[i]= types[i].name
      }
  }
  return (
    <div className='card'>
<NavLink to={`/detail/${id}`}> 
      <div className='card-container'>
            <img className='pokemon-img' src={image} alt={name}/>
          <h2 className='card-title'>{name}</h2>

         <h1 className='card-types'>
              {
                  types.map(type=>{
                      return (
                          <li>⚛ {type}</li>
                          )
                        })
                    }
         </h1>
      
      </div>
    </NavLink>
    </div>
          
  );
}

export default Card;
