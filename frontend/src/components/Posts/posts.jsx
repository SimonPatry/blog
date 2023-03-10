import './posts.scss';
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AppContext from "../../context/AppContext";
import {Button, TextField, MenuItem} from "@mui/material";
import {fetchPost} from "../fetch";

const Posts = () => {
  // Hook de navigation
  const navigate = useNavigate();

  // On récupère les variables d'environnement
  const { REACT_APP_POST } = process.env;

  const [post, setPost] = useState({title:"", description:"", img:""});

  useEffect(() => {
    console.log(post)
  }, [post])

  // Fonction de post
  const handlePost = async(e) => {
    e.preventDefault();
    try{
      await fetchPost(REACT_APP_POST, post)
        .then(res => {
          console.log(res);
        });
    } catch(e) {
      console.error(e);
    }
  }

  // Fonction de mise à jour du formulaire
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value}
    );
  }

  return (
    <div className="post">
      <div className="post__container">
        <div className="post__container__wrapper">
          <h1>Créer un acticle</h1>
            <div className="post__container__wrapper__input">
                      <TextField name="title" id="title" className="formInput" label="Titre" color="primary" onChange={(e) => {handleChange(e)}} />
                      <TextField name="description" id="description" className="formInput" label="Description" color="primary" onChange={(e) => {handleChange(e)}} />
              <TextField name="img" id="img" className="formInput" label="URL de l'image" color="primary" onChange={(e) => handleChange(e)} />
            </div>
            <Button style={{margin: '0 auto', display: "flex"}} variant="outlined" type="submit" className="post__container__wrapper__button" onClick={(e) => handlePost(e)}>
              Ajouter
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Posts;