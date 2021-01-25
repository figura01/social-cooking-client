import React, {useState, useEffect} from 'react';
import { useForm }  from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { buildFormData } from '../../../utils/buildFormData';
import apiHandler from '../../../api/apiHandler';

import '../../../styles/EditUser.css';

const schema = yup.object().shape({
  picture: yup
    .mixed()
    .required("You need to provide a file")
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0].size <= 100000;
    }),
});

const FormEdit = props => {
  const [user, setUser] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uploadFile, setUploadfile] = useState("");
  const [errorApi, setErrorApi] = useState("");
  const { 
    watch, 
    register, 
    handleSubmit, 
    errors,
    
    setValue,  
  } = useForm({
    validationSchema: schema,
    defaultValues: {
      pseudo: "",
      email: "",
      confirmPassword: "",
    },
    
  });
  
  const loadData = async (userId) => {
    try {
      const loadedUser = await apiHandler.getOne(`api/admin/users/${userId}`);
      console.log(loadedUser);

      setUser(loadedUser);
      setDataLoaded(true);
      setValue(
        "pseudo", loadedUser.pseudo,
      )
      setValue("email", loadedUser.email)
      setValue("gender", loadedUser.gender)
    } catch(errApi) {
      console.log(errApi)
    }
  }

  const submit = async (data) => {
    
      console.log('data: ', data);
      console.log(uploadFile.length)
      if(uploadFile.length !== 0) {
        console.log("no file")
        data.image = uploadFile;
      }
      data.userId = props.match.params.id;
      const fd = new FormData();
      console.log('data', data)
      buildFormData(fd, data);
    try {
      const updatedUser = await apiHandler.updateOne("api/admin/users/edit", fd);
      if (updatedUser) {
        props.history.push("/admin")
      }

    } catch(errApi) {
      console.log(errApi);
    }
    
  }

  useEffect(() => {
    console.log('props');
    console.log(props)
    const userId = props.match.params.id;

    loadData(userId)
  }, []);

  return (
    <div className="admin edit-user">
     
      {dataLoaded && <>
      <form className="form form-edit" 
        autoComplete="off"
        onSubmit={handleSubmit(submit)} 
        enctype="multipart/form-data"
        noValidate 
      >
        <h2 className="form-title">Edit User</h2>
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
          {user.avatar && 
          <>
            <p className="label">Current Avatar</p>
            <img src={user.avatar} className="current-avatar" alt="#" />
          </>}
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
        
        <div className="form-action">
          <button className="btn btn-edit btn-lg">Update</button>
        </div>
      </form>
      </>}
    </div>
  )
}

export default FormEdit
