import React, { useState } from 'react';
import { withUser } from '../../components/Auth/withUser';

import FormRecipe from '../../components/Forms/FromRecipe';

import '../../styles/pages/CreayeRecipe.css';

const CreateRecipe = props => {
  

  return (
    <div className="page create-recipe">
      <h2 className="page-title">Create New Recipe</h2>
      <FormRecipe />
    </div>
  )
}

export default withUser(CreateRecipe);
