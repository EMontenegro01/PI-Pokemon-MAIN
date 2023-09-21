import Card from "../Card/Card";
import './Cards.css'
function Cards ({allPokemons}){

    const pokemonsList = allPokemons; 
    return (
        <div className="card-list">
            {pokemonsList?.map((pokemon)=>(
                <Card pokemon={pokemon}/>
            ))}  
        </div>
    )
}

export default Cards;