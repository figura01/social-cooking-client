import React, { useState } from 'react';
import './Form.css';
import FormSignup from './Signup/FormSignup';
import FormSignin from './FormSignin';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
    console.log()
  }

  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-2.svg' alt='spaceship' />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSignin />
        )}
      </div>
    </>
  );
};

export default Form;
