import React, { useContext, useEffect, useState } from 'react';
import { fetchJson } from '../fetch';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./home.scss";
import AppContext from '../../context/AppContext';

const Home = () => {

    const { user } = useContext(AppContext);

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h1>Bienvenue sur l'intranet</h1>
            {user && <p>
                {`${user.firstname} ${user.lastname}`}
            </p>}
            <h3>Avez-vous dit bonjour à:</h3>
        </div>
    );
}

export default Home;