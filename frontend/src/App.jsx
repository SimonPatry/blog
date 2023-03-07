import './App.scss';
import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link,
} from "react-router-dom";
import Login from "./components/Login/Login";
import SignIn from "./components/SignIn/SignIn";
import EditUser from './components/EditUser/EditUser';
import {fetchJson} from "./components/fetch";
import AppContext from "./context/AppContext";
import Home from './components/Home/Home';
import { Avatar, Button } from '@mui/material';
import Collaborators from './components/Collaborators/Collaborators';
import { Drawer } from '@mui/material';


const App = () => {
  // On importe les variables d'environnement
  const { REACT_APP_USER } = process.env;

  // Tous les state de App.jsx
  const [sessionToken, setSessionToken] = useState('');
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Fonction pour récupérer l'utilisateur
  const fetchUser = async() => {
    try{
      return await fetchJson(REACT_APP_USER);
    } catch(e){
      console.error(e);
    }
  }

  const handleDrawer = () => {
    setOpen(open ? false :true)
  }

  // Quand le token est présent, on récupère l'utilisateur
  useEffect(() => {
    sessionToken &&
      fetchUser().then(fetchedUser => {
        console.log(fetchedUser)
        setUser(fetchedUser);
      })
  }, [sessionToken])

  // On met à jour le state du token
  useEffect(() => {
    setSessionToken(localStorage.getItem('token'));

    sessionToken && 
    fetchUser().then(fetchedUser => {
      console.log(fetchedUser)
      setUser(fetchedUser);
    })
  }, []);

  // Données de context
  let providerData = {
    sessionToken,
    setSessionToken,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={providerData}>
      <div className="App">
        <Router>
          <Button onClick={() => {
            handleDrawer();
          }}>
            Open
          </Button>
          <header className="App-header">
            <Drawer
              anchor="left"
              open={open}
              onClose={() => {
                handleDrawer();
              }}
            >
              <nav>
                <Link to="/">Home</Link>
                <Link to="/collaborators">Collaborators</Link>
                {
                  !user ? (
                    <>
                      <Link to="/login">Log in</Link>
                    </>
                  )
                  :
                  (
                    <>
                      { sessionToken && user && user.isAdmin &&
                      <Link to="/sign_in"> + Ajouter </Link>
                      }
                      <Link to={`/edit_user`}>
                        <Avatar
                          alt={`${user.firstname} ${user.lastname}`}
                          src={user.photo}
                        />
                      </Link>
                      <Link to="/" onClick={() => {
                          localStorage.removeItem("token");
                          req.session.destroy();
                          setUser(emptyUser);
                        }}
                      >
                        Sign Out
                      </Link>
                    </>
                  )
                }
              </nav>
            </Drawer>
          </header>
          <div className="globalContainer">
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route exact path="/collaborators" element={<Collaborators />}/>
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/sign_in" element={<SignIn />}/>
              <Route exact path='/edit_user' element={<EditUser/>}/>
              <Route exact path='/users/:id' element={<EditUser/>}/>
            </Routes>
          </div>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;