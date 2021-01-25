import React,  { useContext } from "react";
import {withRouter, Link} from "react-router-dom";
import { UserContext } from "../../Auth/UserContext";
import apiHandler from '../../../api/apiHandler';

import useForm from "../../../hooks/useForm";
import validate from './validateInfo'

import '../../../styles/Form.css';

const FormSignup = (props) => {
  const context = useContext(UserContext);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(submit, validate);
  
  async function submit() {
    console.log(values)
    const register = await apiHandler.signup(values);
    if(register) {
      context.setUser(values);
      props.history.push("/")
    }
    console.log('register', register);
  };


  console.log(props)
  return (
    <form className="form form-signup"
      onChange={handleChange}
      onSubmit={handleSubmit}>
      <h3 className="form-title">Sign Up</h3>
      <div className="form-group">
        <p className="form-label">Gender</p>
        <div className="gender">
          <label htmlFor="male">
            Men
            <input type="radio" id="male" name="gender" checked value="male"
              onChange={handleChange}/>

          </label>
          <label htmlFor="women">
            Women
            <input type="radio" id="women" name="gender" value="women"
              onChange={handleChange}
              />
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="pseudo">Pseudo</label>
        <input type="pseudo" id="pseudo" name="pseudo" value={
            values.pseudo || ""
          }
          onChange={handleChange}
          className="form-input" 
          />
        {errors.pseudo && (
          <p className="msg-error">{errors.pseudo}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autocomplete="off" className="form-input" />
        {errors.email && (
          <p className="msg-error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <input type="password" id="password" name="password" autoComplete="off" className="form-input" />
        {errors.password && (
          <p className="msg-error">{errors.password}</p>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" className="form-input" />
        {errors.confirmPassword && (
          <p className="msg-error">{errors.confirmPassword}</p>
        )}
      </div>

      <button>Submit</button>
    </form>
  );

}

export default withRouter(FormSignup);
