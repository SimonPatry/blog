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
import { styled, Typography, Avatar, IconButton, Toolbar, Divider, Button } from '@mui/material';
import Collaborators from './components/Collaborators/Collaborators';
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import { Box } from '@mui/system';


const StyledLink = styled('a')({
  textDecoration: "none",
  textAlign: "left",
  color: "white",
  width: "100%",
  height: "2em",
});

const App = () => {
  // On importe les variables d'environnement
  const { REACT_APP_USER } = process.env;

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
          <AppBar sx={{
            backgroundColor: "#0e1217",
          }}>
            <Toolbar>
              <IconButton
                onClick={() => {
                  handleDrawer();
                }}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                DailyDev
              </Typography>
            </Toolbar>
          </AppBar>
            <Drawer
              anchor="left"
              open={open}
              onClose={() => {
                handleDrawer();
              }}
            >
              <Box
                width="240px"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  backgroundColor: "#0e1217",
                  paddingLeft: "20px",
                }}
              >
                <Box sx={{height: "50px"}}>
                {
                  !user ? (
                    <>
                      <Button href="/login">Log in</Button>
                    </>
                  )
                  :
                  (
                    <>
                      { sessionToken && user && user.isAdmin &&
                      <StyledLink href="/sign_in"> + Ajouter </StyledLink>
                      }
                      <StyledLink href={`/edit_user`}>
                        <Avatar
                          alt={`${user.firstname} ${user.lastname}`}
                          src={user.photo}
                        />
                      </StyledLink>
                      <StyledLink href="/" onClick={() => {
                          localStorage.removeItem("token");
                          req.session.destroy();
                          setUser(emptyUser);
                        }}
                      >
                        Sign Out
                      </StyledLink>
                    </>
                  )
                }
                </Box>
                
                <Divider sx={{color:"white"}} />
                <StyledLink href="/">Home</StyledLink>
                <StyledLink href="/collaborators">Collaborators</StyledLink>
              </Box>
              <Box
                width="260px"
                sx={{
                  height: "100%",
                  backgroundColor: "#0e1217",
                }}
              ></Box>
            </Drawer>
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