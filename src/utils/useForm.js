import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  consple.log('useform');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect((event) => {
    console.log('use effect');
    event.persist();
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    console.log('handleChange')
    event.persist();
    console.log(event.target.name, event.target.value, event.target.type)
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default useForm;