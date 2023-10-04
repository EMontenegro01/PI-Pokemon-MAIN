import {useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validate from "./validate";
import {getAllTypes} from "../../Redux/actions"
import {useDispatch, useSelector} from "react-redux";
import "./Form.css";

const Form = () => {

  const dispatch= useDispatch();
  const types = useSelector((state) => state.allTypes);
  const navigate = useNavigate();

  const [dataForm, setDataForm] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  
  useEffect(()=>{
    dispatch(getAllTypes());
  }, []);


  const [selectedTypes, setSelectedTypes] = useState([]);
  const [errors, setErrors] = useState({});


  const handleTypeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
  
    if (selectedOptions.length > 2) {
      event.preventDefault(); // Evitar que se seleccionen más de 2 tipos
      return;
    }
   
  
    setDataForm({
      ...dataForm,
      types: selectedOptions,
    });
  
    setErrors(
      validate({
        ...dataForm,
        types: selectedOptions,
      })
    );
  
    setSelectedTypes(selectedOptions);
  };
  
  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      // Desmarca el tipo si ya está seleccionado
      const updatedTypes = selectedTypes.filter((t) => t !== type);
      setSelectedTypes(updatedTypes);
    } else if (selectedTypes.length < 2) {
      // Marca el tipo si no está seleccionado y no se han seleccionado 2 tipos aún
      const updatedTypes = [...selectedTypes, type];
      setSelectedTypes(updatedTypes);
    }
  
    // Verificar si al menos un tipo está seleccionado
    if (updatedTypes.length === 0) {
      alert("No se puede crear el Pokémon sin seleccionar ningún tipo.");
    }
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validar que al menos un tipo esté seleccionado
    if (selectedTypes.length === 0) {
      alert("Selecciona al menos un tipo.");
      return;
    }
  
    // Crear un objeto de datos que incluya los tipos seleccionados
    const formDataWithTypes = {
      ...dataForm,
      types: selectedTypes,
    };
  
    try {
      const response = await axios.post("http://localhost:3001/pokemons", formDataWithTypes);
  
      // Verificar la respuesta del servidor
      if (response.status === 201) {
        console.log("Nuevo Pokémon creado con éxito:", response.data);
        // Actualizar el estado global del store con el nuevo Pokémon
        await response.data?.id;
        // Redireccionar a la ruta donde ver el detalle del nuevo Pokémon
        navigate(`/detail/${response.data.id}`);
      }
    } catch (error) {
      alert("Error al crear el Pokémon:", error);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    
    setErrors(  
      validate({
      ...dataForm,
      [name]: value,
    }));
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit} className="formPokemon">
        <h3>Create Pokémon</h3>
          <label className="labels" htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" required onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.name && 
                  <span className="error">{
                    errors.name
                  } </span> 
                }

          <label className="labels" htmlFor="image">Image URL: </label>
                <input type="text" id="image" name="image" required onChange={handleInputChange} className="inputForm"/><br /><br />
                {
                  errors.image && 
                  <span className="error">{
                    errors.image
                  } </span> 
                }

          <label className="labels" htmlFor="hp">HP: </label>
                <input type="number" id="hp" name="hp" required onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.hp && 
                  <span className="error">{
                    errors.hp
                  } </span> 
                }
          <label className="labels" htmlFor="attack">Attack:  </label>
                <input type="number" id="attack" name="attack" required onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.attack && 
                  <span className="error">{
                    errors.attack
                  } </span> 
                }

          <label className="labels" htmlFor="defense">Defense: </label>
                <input type="number" id="defense" name="defense" required onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.defense && 
                  <span className="error">{
                    errors.defense
                  } </span> 
                }

          <label className="labels" htmlFor="speed">Speed: </label>
                <input type="number" id="speed" name="speed" onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.speed && 
                  <span className="error">{
                    errors.speed
                  } </span> 
                }
          
          <label className="labels" htmlFor="height">Height: </label>
                <input type="number" id="height" name="height" onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.height && 
                  <span className="error">{
                    errors.height
                  } </span> 
                }

          <label className="labels" htmlFor="weight">Weight: </label>
                <input type="number" id="weight" name="weight" onChange={handleInputChange} className="inputForm" /><br /><br />
                {
                  errors.weight && 
                  <span className="error">{
                    errors.weight
                  } </span> 
                }

                <label htmlFor="types" className="types">
                  Types:
                </label>
                <div className="typeCheckboxes">
                  {types.map((tipo) => (
                    <label key={tipo.name} className="tipoLabel">
                      <input
                        type="checkbox"
                        value={tipo.name}
                        onChange={() => handleTypeToggle(tipo.name)}
                        checked={selectedTypes.includes(tipo.name)}
                      />{" "}
                      {tipo.name}
                    </label>
                  ))}
                </div>

          <div>
            <p>Selected: {selectedTypes.join(", ")}</p>
          </div>

          <div className="btnContainer">
            <button className="btnSubmit" type="submit" name="submit">
              CREATE
            </button>
          </div>


    </form>
    </div>
  );
};

export default Form;
