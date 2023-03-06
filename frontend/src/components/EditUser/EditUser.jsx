import './editUser.scss';
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchJson, fetchPatch} from "../fetch";
import { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import React from "react";

const EditUser = () => {
  // Hook de navigation
  const navigate = useNavigate();

  // On récupère les variables d'environnement
  const { REACT_APP_USER, REACT_APP_USERS } = process.env;

  const [user, setUser] = useState(null);
  const {id} = useParams();

  useEffect(() =>{
  console.log(id)
    if (id) {
      console.log("if")
      fetchJson(`${REACT_APP_USERS}/${id}`)
      .then((response)=> {
        setUser(response);
      })
    }
    else {
      fetchJson(`${REACT_APP_USER}`)
      .then((response)=> {
        setUser(response);
      })
    }
  }, []);

  // Fonction de signin
  const handleSignIn = async(e) => {
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
    <div className="edituser">
      <div className="edituser__container">
        <div className="edituser__container__wrapper">
          <h1>Edit User</h1>
            <div className="edituser__container__wrapper__input">
            {user &&
            <>
              <TextField id="gender" label="Civilité" value={user.gender} name="gender" onChange={(e) => {handleChange(e)}} select >
                  <MenuItem value="female">Femme</MenuItem>
                  <MenuItem value="male">Homme</MenuItem>
              </TextField>
              
              <TextField id="category" label="category" value={user.category} name="category" onChange={(e) => {handleChange(e)}} select >
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Technique">Technique</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
              </TextField>

              <TextField id="lastname" name="lastname" className="formInput" label="Nom" color="primary" defaultValue={user.lastname} onChange={(e) => {handleChange(e)}} />
                
              <TextField id="firstname" name="firstname" className="formInput" label="Prénom" color="primary" defaultValue={user.firstname} onChange={(e) => {handleChange(e)}} />
              
              <TextField id="email" name="email" className="formInput" label="Email" color="primary" defaultValue={user.email} onChange={(e) => {handleChange(e)}} />
              
              <TextField id="password" name="password" className="formInput" label="Password" type="password" color="primary" onChange={(e) => {handleChange(e)}} />

              <TextField id="phone" name="phone" className="formInput" label="Téléphone" color="primary" defaultValue={user.phone} onChange={(e) => {handleChange(e)}} />

              <TextField id="birthdate" name="birthdate" className="formInput" label="Date de naissance" color="primary" defaultValue={user.birthdate }onChange={(e) => {handleChange(e)}} />
              
              <TextField id="city" name="city" className="formInput" label="Ville" color="primary" defaultValue={user.city} onChange={(e) => {handleChange(e)}} />
              
              <TextField id="country" name="country" className="formInput" label="Pays" color="primary" defaultValue={user.country} onChange={(e) => {handleChange(e)}} />
              

              <TextField id="photo" name="photo" className="formInput" label="URL de la photo" color="primary" onChange={(e) => {handleChange(e)}} />
              
              <TextField id="isAdmin" label="isAdmin" value={user.isAdmin} name="isAdmin" onChange={(e) => {handleChange(e)}} select >
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
              </TextField>
            </>}
            </div>
            <Button style={{margin: '0 auto', display: "flex"}} variant="outlined" type="submit" className="edituser__container__wrapper__button" onClick={(e) => handleSignIn(e)}>
              Enregistrer
            </Button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;