import './login.scss';
import {fetchPost} from "../fetch";
import React, {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import AppContext from '../../context/AppContext';

const Login = () => {
  // Hook de navigation
  const navigate = useNavigate();

  // On récupère les variables d'environnement
  const { REACT_APP_LOGIN } = process.env;
  const { setSessionToken } = useContext(AppContext);

  // On définit un state par défaut pour les credentials
  const emptyCredentials = {
    email: '',
    password: ''
  }

  // Tous les states de Login.jsx
  const [credentials, setCredentials] = useState(emptyCredentials);

  // Fonction de login
  const handleLogin = async(e) => {
    e.preventDefault();

    try{
      await fetchPost(REACT_APP_LOGIN, credentials)
        .then(res => {
          // Si le login est correct, on stocke le token dans le localStorage et on redirige vers la page d'accueil
          if(res.status === true){
            localStorage.setItem('token', res.token);
            setSessionToken(res.token);
            navigate('/');
          }
          // Sinon on affiche un message d'erreur et on réinitialise les champs
          else{
            navigate('/login');
            throw new Error(res.message);
          }
        })
    } catch(e) {
      console.error(e);
    }
  }
  // Fonction de mise à jour du formulaire
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value}
    );
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__wrapper">
          <h1>Log in</h1>
            <div className="login__container__wrapper__input">
              <TextField  id="email" name="email" className="formInput" label="email" color="primary" onChange={(e) => handleChange(e)} />
              <TextField id="password" className="formInput" label="Password" type="password" color="primary" onChange={(e) => handleChange(e)} />
            </div>
            <Button variant="outlined" type="submit" className="login__container__wrapper__button" onClick={(e) => handleLogin(e)}>
              Log in
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;