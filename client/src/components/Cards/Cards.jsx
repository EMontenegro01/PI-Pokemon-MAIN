import Card from "../Card/Card";
import './Cards.css'
const Cards = ({ currentPokemons})=>{

    return (
        <div className="card-list">
            {
                currentPokemons?.map((pokemon)=>{
                    return (
                        <Card
                        key= {pokemon.id}
                        id= {pokemon.id}
                        name= {pokemon.name}
                        image={pokemon.image}
                        types={pokemon.types}
                        />
                    )
                })
            }

        </div>
    );
}

export default Cards;