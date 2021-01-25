import { useState, useEffect, useRef } from "react";


const useCustomForm = ({ initialValues, onSubmit }) => { 
  console.log('My first custom hook');

  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  const formRendered = useRef(true);

  useEffect(() => {
    if (formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
      setOnSubmitting(false);
      setOnBlur(false);
    }
    formRendered.current = false;
  }, [initialValues]);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (event) => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    setTouched({ ...touched, [name]: true });

    console.log(target, name, value);
    if (!values.firstName.trim()) {
      errors.firstName = 'Firstname required';
    }
  
    if (!values.lastName.trim()) {
      errors.lastName = 'Lastname required';
    }
  
  
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors({ ...errors });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors({ ...errors });
    onSubmit({ values, errors });
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  };
}

export default useCustomForm;