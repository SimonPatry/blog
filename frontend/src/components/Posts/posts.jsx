import './posts.scss';
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchPost} from "../fetch";

const posts = () => {
  // Hook de navigation
  const navigate = useNavigate();

  // On récupère les variables d'environnement
  const { REACT_APP_SIGNIN } = process.env;

  const [user, setUser] = useState({gender:"", category:"", lastname:"", firstname:"", email:"", password:"", city:"", country:"", photo:"", phone:"", birthdate:""});

  useEffect(() => {
    console.log(user)
  }, [user])

  // Fonction de signin
  const handleSignIn = async(e) => {
    e.preventDefault();
    try{
      await fetchPost(REACT_APP_SIGNIN, user)
        .then(res => {
          // Si l'utilisateur n'existe pas, on redirige vers la page de login
          if(res.status === true){
            navigate('/login');
          }
          // Sinon on affiche un message d'erreur et on réinitialise les champs
          else{
            navigate('/sign_in');
            throw new Error(res.message);
          }
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
      <div className="signin__container">
        <div className="signin__container__wrapper">
          <h1>Créer un utilisateur</h1>
            <div className="signin__container__wrapper__input">
            <TextField id="gender" label="Civilité" value={user.gender} name="gender" onChange={(e) => handleChange(e)} select>
                <MenuItem value="female">Femme</MenuItem>
                <MenuItem value="male">Homme</MenuItem>
            </TextField>
              <TextField id="category" label="category" value={user.category} name="category" onChange={(e) => {handleChange(e)}} select>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Technique">Technique</MenuItem>
                <MenuItem value="Client">Client</MenuItem>
            </TextField>

              <TextField name="lastname" id="lastname" className="formInput" label="Nom" color="primary" onChange={(e) => {handleChange(e)}} />
              
              <TextField name="firstname" id="firstname" className="formInput" label="Prénom" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField name="email" id="email" className="formInput" label="email" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField name="password" id="password" className="formInput" label="Password" type="password" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField name="phone" id="phone" className="formInput" label="Téléphone" color="primary" onChange={(e) => handleChange(e)} />
              <TextField name="birthdate" id="birthdate" className="formInput" label="Date de naissance" color="primary" onChange={(e) => handleChange(e)} />

              <TextField name="city" id="city" className="formInput" label="Ville" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField name="country" id="country" className="formInput" label="Pays" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField name="photo" id="photo" className="formInput" label="URL de la photo" color="primary" onChange={(e) => handleChange(e)} />
            </div>
            <Button style={{margin: '0 auto', display: "flex"}} variant="outlined" type="submit" className="signin__container__wrapper__button" onClick={(e) => handleSignIn(e)}>
              Ajouter
            </Button>
        </div>
      </div>
    </div>
  );
}

export default posts;