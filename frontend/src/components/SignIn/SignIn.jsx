import './signin.scss';
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchPost} from "../fetch";

const SignIn = () => {
  // Hook de navigation
  const navigate = useNavigate();

  // On récupère les variables d'environnement
  const { REACT_APP_SIGNIN } = process.env;

  const [user, setUser] = useState({ lastname:"", firstname:"", email:"", password:"",photo:""});

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
      <div className="signin-container">
        <div className="signin-container-wrapper">
          <h1>Créer un utilisateur</h1>
            <div className="signin-container-wrapper-input">
              <TextField name="lastname" id="lastname" className="formInput textfield" label="Nom" color="primary" onChange={(e) => {handleChange(e)}} />
              
              <TextField name="firstname" id="firstname" className="formInput textfield" label="Prénom" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField  name="email" id="email" className="formInput textfield" label="email" color="primary" onChange={(e) => handleChange(e)} />
              
              <TextField  name="password" id="password" className="formInput textfield" label="Password" type="password" color="primary" onChange={(e) => handleChange(e)} />
              <TextField  name="photo" id="photo" className="formInput textfield" label="URL de la photo" color="primary" onChange={(e) => handleChange(e)} />
            </div>
            <Button style={{margin: '0 auto', display: "flex"}} variant="outlined" type="submit" className="signin__container__wrapper__button" onClick={(e) => handleSignIn(e)}>
              Ajouter
            </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;