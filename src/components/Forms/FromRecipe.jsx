import React, {useState} from 'react'
import Ingredient from '../Ingredients';

import '../../styles/Form.css';
import '../../styles/FormRecipeCreate.css';



const FromRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  

  const getIngredient = (ingredient) => {
    console.log('get ingredient');
    console.log("data: ",ingredient)
    setIngredients(ingredients => [...ingredients, ingredient]);
    console.log(ingredients)
  }

  const removeIngredient = (e, ing) => {
    e.preventDefault();
    console.log("ing", ing)
    const copyArr = [...ingredients]; 

    console.log("copyArr", copyArr);
    const newArrIng = copyArr.filter((ingredient) => {
      if(ingredient.name !== ing.name) {
        return ingredient
      }});

      console.log(newArrIng);

    setIngredients(newArrIng);
  }

  return (
    <form className="form form-create-recipe">
      <div className="form-group">
        <label className="form-label" htmlFor="title">Title</label>
        <input className="form-input" type="text" name="title" id="title" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Description</label>
        <textarea className="form-input" name="description" id="description" cols="10" rows="5">

        </textarea>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="ingredients">Ingredients</label>
        <Ingredient getIngredient={getIngredient} removeArr={removeIngredient}/>
      </div>
        {ingredients.length > 0 && (
          <>
            {ingredients.map((ing) => {
              return <p>{ing.name} {ing.unite} {ing.quantity} <button onClick={(e) => {removeIngredient(e,ing)}}><i className="fas fa-times" /></button></p>
            })}
          </>
        )}
      <button className="btn btn-lg btn-success">Create recipe</button>
    </form>

  )
}

export default FromRecipe
