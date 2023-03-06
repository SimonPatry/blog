import React, { useContext, useEffect, useState } from 'react';
import { fetchJson } from '../fetch';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./home.scss";

const Home = () => {

    const [user, setUser] = useState({});
    const {REACT_APP_RANDOM} = process.env;
    
    // get One random user
    const getRandomUser = async() => {
        await fetchJson(REACT_APP_RANDOM)
        .then((response) => {
            setUser(response);
        })
    }

    // on mount get user for homePage
    useEffect(()=> {
        getRandomUser();
    }, [])

    return (
        <div>
            <h1>Bienvenue sur l'intranet</h1>
            <p>La plateforme de l'entreprise qui permet de retrouver tout vos collaborateurs.</p>
            <h3>Avez-vous dit bonjour à:</h3>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image={user.photo}
                    alt={`${user.firstname} ${user.lastname} ()`}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${user.firstname} ${user.lastname} (${user.birthdate})`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${user.city}, ${user.country}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${user.email}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${user.phone}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`Anniversaire: ${user.birthdate}`}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button style={{margin: '0 auto', display: "flex"}} onClick={() => {
                setUser(getRandomUser());
            }}>
                DIRE BONJOUR A QUELQU'UN D'AUTRE
            </Button>

        </div>
    );
}

export default Home;