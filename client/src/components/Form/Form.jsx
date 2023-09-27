import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
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
  });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [imageError, setImageError] = useState(""); // Estado para controlar errores en la URL de la imagen

  const handleTypeChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedTypes(selectedTypes.concat(selectedValues));
  };

  const validateImageUrl = (url) => {
    // Utilizamos una expresión regular para validar la URL de la imagen
    const urlPattern = /\.(png|jpg)$/i; // Acepta extensiones .png y .jpg (insensible a mayúsculas/minúsculas)
  
    return urlPattern.test(url);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos que todos los campos obligatorios estén llenos
    if (
      !dataForm.name ||
      !dataForm.image ||
      !dataForm.hp ||
      !dataForm.attack ||
      !dataForm.defense ||
      !dataForm.speed ||
      !dataForm.height ||
      !dataForm.weight
    ) {
      window.alert("Todos los campos marcados con (*) son obligatorios.");
      return;
    }

    // Validamos la URL de la imagen
    if (!validateImageUrl(dataForm.image)) {
      setImageError(
        "La URL de la imagen debe ser del formato: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{número}.png"
      );
      return;
    }

    // Crear un objeto con los datos del nuevo Pokémon
    const newPokemon = {
        name: dataForm.name,
        image: dataForm.image,
        hp: dataForm.hp || null, // Usamos null para campos opcionales no completados
        attack: dataForm.attack || null,
        defense: dataForm.defense || null,
        speed: dataForm.speed || null,
        height: dataForm.height || null,
        weight: dataForm.weight || null,
        types: selectedTypes,
    };

    try {
      // Enviar una solicitud POST al servidor para crear el Pokémon
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        newPokemon
      );

      if (response.status === 201) {
        console.log("Nuevo Pokémon creado con éxito:", response.data);
        // Reiniciamos los campos y el estado de errores después de la creación exitosa
        navigate(`/detail/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error al crear el Pokémon:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="formContainer">
          <div className="formGuide">
              <h3 className="guideTitle">Guía para completar el formulario:</h3>
              <p className="guideText">
                  - Todos los campos marcados con (*) son obligatorios.
              </p>
              <p className="guideText">
                  - La URL de la imagen debe ser del formato .png o .jpg
              </p>
          </div>
      </div>
      <form className="formPokemon" onSubmit={handleSubmit}>
        <label className="labelForm" htmlFor="name">
          Name: * {dataForm.name ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="text"
          id="name"
          name="name"
          required
          onChange={handleInputChange}
          value={dataForm.name}
        />
        <br />
        <br />
        


        <label className="labelForm" htmlFor="image">
          Image URL: *{" "}
          {dataForm.image ? (
            validateImageUrl(dataForm.image) ? (
              ""
            ) : (
                <div className="errorAlert">
                    <p className="errorText">{imageError}</p>
                </div>
              
            )
          ) : (
            "(Campo obligatorio)"
          )}
        </label>
        <input
          className="inputForm"
          type="text"
          id="image"
          name="image"
          required
          onChange={handleInputChange}
          value={dataForm.image}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="hp">
          HP: * {dataForm.hp ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="number"
          id="hp"
          name="hp"
          required
          onChange={handleInputChange}
          value={dataForm.hp}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="attack">
          Attack: * {dataForm.attack ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="number"
          id="attack"
          name="attack"
          required
          onChange={handleInputChange}
          value={dataForm.attack}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="defense">
          Defense: * {dataForm.defense ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="number"
          id="defense"
          name="defense"
          required
          onChange={handleInputChange}
          value={dataForm.defense}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="speed">
          Speed: * {dataForm.speed ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="number"
          id="speed"
          name="speed"
          onChange={handleInputChange}
          value={dataForm.speed}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="height">
          Height: * {dataForm.height ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="number"
          id="height"
          name="height"
          onChange={handleInputChange}
          value={dataForm.height}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="weight">
          Weight: * {dataForm.weight ? "" : "(Campo obligatorio)"}
        </label>
        <input
          className="inputForm"
          type="number"
          id="weight"
          name="weight"
          onChange={handleInputChange}
          value={dataForm.weight}
        />
        <br />
        <br />

        <label className="labelForm" htmlFor="type">
          Type:
        </label>
        <div>
          <select
            className="selectForm"
            id="type"
            multiple={true}
            onChange={handleTypeChange}
            value={selectedTypes}
          >
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                        <option value="unknown">Unknown</option>
                        <option value="shadow">Shadow</option>
          </select>
          <br />
          <br />
        </div>
        <div>
          <p>Seleccionado(s): {selectedTypes.join(", ")}</p>
        </div>

        <button className="buttonForm" type="submit">
          Crear Pokémon
        </button>
      </form>
    </div>
  );
};

export default Form;
