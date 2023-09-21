import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

import { getAllPokemons } from "../../Redux/actions"; 
import Cards from "../Cards/Cards";
import './Home.css'
import Detail from "../Detail/Detail";


function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=>state.allPokemons);

    useEffect(()=>{
        dispatch(getAllPokemons())


    },[dispatch]) 


    return (
        <div className="home">
            <h2 className="home-title">HOME</h2>
            
            <Cards allPokemons={allPokemons}/>
            
        </div>
    )
}

export default Home;