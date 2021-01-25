import React, { useState, useEffect} from 'react'
import apiHandler from '../../api/apiHandler';

import '../../styles/admin/Dashbord.css';

const Dashboard = () => {
  
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false)
  function loadData() {
    console.log('loadData');
    apiHandler.getAll("api/admin/")
    .then(res => {
      console.log(res);
      setData(res);
      setIsLoaded(true);
    })
    .catch(err => {
      console.log(err);
    })
  };

  const deleteUser = function(userId) {
    console.log(userId);
    const data = {
      userId,
    }

    apiHandler.deleteOne(`api/admin/users/${userId}/delete`)
    .then(res => {
      console.log(res);
      loadData();
    })
    .catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    console.log('useEffect');
    
    loadData()
    
  },[]);
    return (
      <div className="dashboard">
        <h1>Dashborad</h1>
        <section className="section section-users">
          <h2 className="section-title">Users</h2>
          <table className="table table-users" cellpadding="0" cellspacing="0">
          <thead>
            <tr >
              <th>Id°</th>
              <th>Avatar</th>
              <th>Pseudo</th>
              <th>Role</th>
              <th><a href="admin/users/create" className="btn btn-create" ><i className="fas fa-plus"></i> New</a></th>
            </tr>
          </thead>

          <tbody>
            
            {isLoaded && (
              <>
              {data.users.map((user)=> {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td><img src={user.avatar} alt="" className="avatar" /> </td>
                    <td>{user.pseudo}</td>
                    <td>{user.role}</td>
                    <td>
                      <a href={`admin/users/${user._id}/show`} className="btn btn-show"><i className="fas fa-eye"></i>Show</a>
                      <a href={`admin/users/${user._id}/edit`} className="btn btn-edit"><i className="fas fa-pen"></i>Edit</a>
                      <button onClick={() => {deleteUser(user._id)}} className="btn btn-delete"><i className="fas fa-trash"></i>Delete</button>
                    </td>
                  </tr>
                )

              })}
              </>
            )}

          </tbody>
        </table>
        </section>

        <section className="section section-recipes">
          <h2 className="section-title">Recipes</h2>
          <table className="table table-recipes">
          <thead>
            <th>
              <td>Id°</td>
              <td>Pseudo</td>
              <td>Role</td>
              <td><i className="fas fa-plus"></i></td>
            </th>
          </thead>

          <tbody>
            
            {isLoaded && (
              <>
              {data.users.map((user)=> {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.pseudo}</td>
                    <td>{user.role}</td>
                    <td>
                      <a href={`admin/users/${user._id}/show`} className="btn btn-show"><i className="fas fa-eye"></i>Show</a>
                      <a href={`admin/users/${user._id}/edit`} className="btn btn-edit"><i className="fas fa-pen"></i>Edit</a>
                      <a href={`admin/users/${user._id}/delete`} className="btn btn-delete"><i className="fas fa-trash"></i>Delete</a>
                    </td>
                  </tr>
                )

              })}
              </>
            )}

          </tbody>
        </table>
        </section>

        <section className="section section-tags">
          <h2 className="section-title">Tags</h2>
          <table className="table table-tags">
          <thead>
            <th>
              <td>Id°</td>
              <td>Pseudo</td>
              <td>Role</td>
              <td><i className="fas fa-plus"></i></td>
            </th>
          </thead>

          <tbody>
            
            {isLoaded && (
              <>
              {data.users.map((user)=> {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.pseudo}</td>
                    <td>{user.role}</td>
                    <td>
                      <a href={`admin/users/${user._id}/show`} className="btn btn-show"><i className="fas fa-eye"></i>Show</a>
                      <a href={`admin/users/${user._id}/edit`} className="btn btn-edit"><i className="fas fa-pen"></i>Edit</a>
                      <a href={`admin/users/${user._id}/delete`} className="btn btn-delete"><i className="fas fa-trash"></i>Delete</a>
                    </td>
                  </tr>
                )

              })}
              </>
            )}

          </tbody>
        </table>
        </section>
        
      </div>
    );
  
}
  

export default Dashboard;
/*

  

  return (
    
  )
*/