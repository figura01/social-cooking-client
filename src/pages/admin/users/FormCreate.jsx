import React, { useState } from 'react'
import { useForm }  from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { buildFormData } from '../../../utils/buildFormData';
import apiHandler from '../../../api/apiHandler';

import '../../../styles/Form.css';

const schema = yup.object().shape({
  picture: yup
    .mixed()
    .required("You need to provide a file")
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0].size <= 100000;
    }),
});

const FormCreate = (props) => {
  const schema = yup.object().shape({
    picture: yup
      .mixed()
      .required("You need to provide a file")
      .test("fileSize", "The file is too large", (value) => {
        return value && value[0].size <= 10000;
      }),
  });
  const [uploadFile, setUploadfile] = useState("");
  const [errorApi, setErrorApi] = useState("");

  const { watch, register, handleSubmit, errors } = useForm({
    validationSchema: schema,
    
  });

  const submit = async (data) => {
    data.image = uploadFile;
    console.log(data);
    console.log('submit')
    console.log(uploadFile)
    const fd = new FormData();

    console.log(data);
    buildFormData(fd, data);

    try {
      const responseApi = await apiHandler.createOne('api/admin/users', fd);
      console.log('responseApi', responseApi)

      if(responseApi.status === 400) {
        console.log('response api 400');
        setErrorApi(responseApi.data.message);
        console.log(errorApi);
      } else {
        props.history.push("/admin")
      }

    } catch(errApi) {
      console.log(errApi)
    }
    
  };

  return (
    <div>
      <form className="form form-create"
        autoComplete="off"
        onSubmit={handleSubmit(submit)} 
        enctype="multipart/form-data"
        noValidate
      >
        <h2 className="form-title">Create User</h2>

        <div className="form-group">
          <p className="form-label">Gender</p>
          <div className="gender">
            <label htmlFor="male">
              Men
              <input type="radio" id="male" name="gender" value="male" checked
                ref={register({ required: "A gender is required" })}
                 />

            </label>
            <label htmlFor="women">
              Women
              <input type="radio" id="women" name="gender" value="women"
                ref={register({ required: "A gender is required" })}
                />
            </label>
            {errors.gender && <p className="msg-errors">* {errors.gender.message} </p>}
            
          </div>
        </div>

        <div className="form-group">
          <p className="form-label">Avatar</p>
            <label className="custom-upload label" htmlFor="image">
                Upload image
            </label>
            <input 
              id="image" 
              className="input-image" 
              name="image" 
              type="file" 
              ref={register}
              onChange={(event) => setUploadfile(event.target.files[0])}
            />            
            {errors.image && <p className="mas-errors">{errors.image.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="input-pseudo" className="form-label">Pseudo</label>
          <input 
            type="text"
            name="pseudo"
            id="input-pseudo"
            className="form-input"
            ref={register({required: "Pseudo is required", minLength: {value: 3, message: "Your pseudo is too short, need 3 charcters minimal"}})} 
          />
            
          {errors.pseudo && <p className="msg-errors">* {errors.pseudo.message} </p>}

        </div>

        <div className="form-group">
          <label htmlFor="input-email" className="form-label">Email</label>
          <input 
            type="email"
            name="email"
            id="input-email"
            className="form-input"
            ref={register({
              required: "A email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Entered value does not match email format"
              }
            })} 
          />
          {errors.email && <p className="msg-errors">* {errors.email.message} </p>}
          {errorApi && <p className="msg-errors">* {errorApi} </p>}
        </div>

        <div className="form-group">
          <label htmlFor="input-password" className="form-label">Password</label>
          <input 
            type="password"
            name="password"
            id="input-password"
            className="form-input"
            ref={register({
              required: "Password is required", 
              minLength: {
                value: 6, 
                message: "Need 6 characters min"
              }
            })}
          />
          {errors.password && <p className="msg-errors">* {errors.password.message} </p>}
          
        </div>

        <div className="form-group">
          <label htmlFor="input-confirmPassword" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            id="input-confirmPassword" 
            className="form-input" 
            ref={register({
              validate: (value) => value === watch('password'),
              required: "Should match with password"
            })}
            />
            
          {errors.confirmPassword && 
            <p className="msg-errors">
                {errors.confirmPassword.message}
            </p>
          }
        </div>
        <button className="btn btn-success btn-lg">Create</button>
      </form>
    </div>
  )
}

export default FormCreate
