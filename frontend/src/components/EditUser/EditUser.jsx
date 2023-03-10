import './editUser.scss';
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchJson, fetchPatch} from "../fetch";
import { useEffect, useState} from "react";
import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';

const EditUser = () => {
  // On récupère les variables d'environnement
  const { REACT_APP_USER, REACT_APP_USERS } = process.env;

  const [user, setUser] = useState(null);

  useEffect(() =>{
      fetchJson(`${REACT_APP_USER}`)
      .then((response)=> {
        console.log(response)
        setUser(response)
      })
  }, []);

  // Fonction de signin
  const handleEdit = async(e) => {
    e.preventDefault();
    try{
      await fetchPatch(REACT_APP_USERS, user._id + "" , user)
        .then(res => {
          console.log(res);
        });
    } catch(e) {
      console.error(e);
    }
  }

  // Fonction de mise à jour du formulaire
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value}
    );
  }
  return (
    <div className="signin">
      <div className="signin-container">
        <div className="signin-container-wrapper">
          <h1>Edit User</h1>
          { user &&
            <>
            <div className="signin-container-wrapper-input">
              <TextField name="lastname" id="lastname" className="formInput textfield" label="Nom"
              defaultValue={user && user.lastname}
              color="primary" onChange={(e) => {handleChange(e)}} />
              
              <TextField name="firstname" id="firstname" className="formInput textfield" defaultValue={user.firstname} label="Prénom" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField  name="email" id="email" className="formInput textfield" defaultValue={user && user.email} label="email" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField  name="password" id="password" className="formInput textfield" 
              label="Password" type="password" color="primary" onChange={(e) => handleChange(e)} />

              <TextField  name="photo" id="photo" className="formInput textfield" defaultValue={user && user.photo} label="URL de la photo" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField id="isAdmin"  className="formInput textfield" value={user && user.isAdmin ? user.isAdmin : false} name="isAdmin" onChange={(e) => {handleChange(e)}} select >
                  <MenuItem value={true}>true</MenuItem>
                  <MenuItem value={false}>false</MenuItem>
                </TextField>
            </div>
            <Button style={{margin: '0 auto', display: "flex"}} variant="outlined" type="submit" className="signin__container__wrapper__button" onClick={(e) => handleEdit(e)}>
              Save
            </Button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default EditUser;