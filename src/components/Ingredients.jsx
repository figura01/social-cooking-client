import React, { useState } from 'react';
import '../styles/Ingredients.css';

const Ingredients = props => {
  const [name, setName] = useState("");
  const [unite, setUnite] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isValid, setIsValid] = useState(false);

  const addIngredient = (e) => {
    e.preventDefault();
    console.log("addIngredient");
    const ingredient = {
      name,
      unite,
      quantity,
    }
    console.log(ingredient);
    props.getIngredient(ingredient)
  }
  const validatedIng = () =>  {
    if(name !== "" && unite !== "" && quantity !== "") {
      setIsValid(true);
    }
  }

  console.log(props)
  return (
    <div className="ingredient">
      <div className="form-group">
        <label htmlFor="name">Ingredient Name</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => {setName(e.target.value)}} onBlur={validatedIng} />
      </div>

      <div className="form-group">
        <label htmlFor="unite">Unite</label>
        <select name="unite" id="unite" value={unite} onChange={(e) => {setUnite(e.target.value)}} onBlur={validatedIng}>
          <option checked value="kg">kg</option>
          <option value="g">g</option>
          <option value="l">l</option>
          <option value="ml">ml</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity</label>
        <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} onBlur={validatedIng}/>
      </div>

      <button className={isValid ? "btn btn-create" : "btn btn-create disbled"} disabled={!isValid} onClick={(e) => {addIngredient(e)}}><i className="fas fa-plus-circle"/></button>
      
    </div>
  )
}

export default Ingredients
