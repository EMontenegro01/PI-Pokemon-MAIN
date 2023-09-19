function Card({pokemon}){
    console.log(pokemon)
    const {name, hp, attack} = pokemon
    return (
        <div>
            <h2 >{name}</h2>
            <p>{hp}</p>
            <p>{attack}</p>
        </div>
    )
}

export default Card;