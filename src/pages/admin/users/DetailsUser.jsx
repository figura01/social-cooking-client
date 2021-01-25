import React, { useState, useEffect} from 'react';
import apiHandler from '../../../api/apiHandler';

import '../../../styles/UsersDetails.css';


const DetailsUser = (props) => {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [dataIsLoaLoaded, setDataIsLoaLoaded] = useState(false)
  const loadData = async (userId) => {
    console.log('loadData');

    console.log('userId: ', userId);

    try {
      const loadedUser = await apiHandler.getOne(`api/admin/users/${userId}`);
      console.log(loadedUser);

      setUser(loadedUser);
      setDataIsLoaLoaded(true)
    } catch(errApi) {
      console.log(errApi)
    }
  }

  useEffect(() => {
    console.log(props)
    const userId = props.match.params.id;
    setUserId(userId);

    loadData(userId)
  }, []);

  return (
    <div className="admin users-details">
      <h2 className="page-title">Details User</h2>
      <div className="part user-profile">
        <h3 className="title-section">Profile</h3>
        <div className="line bb">
          <p><span className="label">Avatar: </span>
          {user && <>
            <img src={user.avatar} alt="" />
          </>}</p>
        </div>
        <div className="line bb">

          <p><span className="label">Pseudo: </span> 
            {user && <>
            {user.pseudo}
            </>
          }</p>
          
        </div>

        <div className="line bb">
          <p><span className="label">Email: </span>{user && <>user.email</>}</p>
        </div>

        <div className="line bb">
          <p><span className="label">First name: </span>{user && <>user.firstname</>}</p>
        </div>
        <div className="line bb">
          <p><span className="label">Last name: </span>{user && <>user.firstname</>}</p>
        </div>
        <a href={`/admin/users/${userId}/edit`} className="btn btn-lg btn-edit">Edit</a>

      </div>

      <div className="part user-details">
        <h3 className="title-section">Details</h3>

        <h4>Recipes</h4> 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Likes</th>
              <th>Followers</th>
            </tr>
          </thead>
        </table>

        <h4>Favorites Recipes</h4> 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Remove</th>     
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A name</td>
              <td>Remove</td>
            </tr>
          </tbody>
        </table>

        <h4>Favorites users</h4> 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Remove</th>     
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A name</td>
              <td>Remove</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default DetailsUser
